import 'reflect-metadata'
import { IdentifyBatteryIssuesResolver } from './identify-battery-issues'
import { prisma } from '../../../../prisma/client'
import {
  BatteryRequestProps,
  groupDataBySerialNumber,
} from '../functions/group-data-by-serial-number'
import { BatteryIssuesModel } from '../dts/models/identify-battery-issues'
import dayjs from 'dayjs'
import {
  AcademyEntry,
  Entry,
  countAcademyIds,
} from '../functions/count-academy-needs-replacement'

jest.mock('../functions/group-data-by-serial-number', () => ({
  groupDataBySerialNumber: jest.fn(),
}))

jest.mock('../functions/count-academy-needs-replacement', () => ({
  countAcademyIds: jest.fn(),
}))

jest.mock('../../../../prisma/client', () => ({
  prisma: {
    battery: {
      findMany: jest.fn(),
    },
  },
}))

describe('[@Resolver]: IdentifyBatteryIssuesResolver', () => {
  let resolver: IdentifyBatteryIssuesResolver

  const mockData: any = [
    {
      serialNumber: 'ABC123',
      timestamp: new Date('2023-06-01T10:00:00Z'),
      batteryLevel: 80,
      academyId: 1,
    },
    {
      serialNumber: 'ABC123',
      timestamp: new Date('2023-06-01T14:00:00Z'),
      batteryLevel: 70,
      academyId: 1,
    },
    {
      serialNumber: 'DEF456',
      timestamp: new Date('2023-06-02T10:00:00Z'),
      batteryLevel: 90,
      academyId: 2,
    },
    {
      serialNumber: 'DEF456',
      timestamp: new Date('2023-06-02T14:00:00Z'),
      batteryLevel: 85,
      academyId: 2,
    },
  ]

  const mockResult: BatteryIssuesModel[] = [
    {
      academyId: 1,
      serialNumber: 'ABC123',
      needReplacement: false,
      dates: [
        {
          day: '01/06/2023',
          batteryLevels: [80, 70],
          academyId: 1,
          wasRecharged: false,
          averageDailyUsage: '12.50%',
        },
      ],
    },
    {
      academyId: 2,
      serialNumber: 'DEF456',
      needReplacement: false,
      dates: [
        {
          day: '02/06/2023',
          batteryLevels: [90, 85],
          academyId: 2,
          wasRecharged: false,
          averageDailyUsage: '5.56%',
        },
      ],
    },
  ]

  beforeAll(() => {
    resolver = new IdentifyBatteryIssuesResolver()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return battery issues grouped by serial number', async () => {
    jest.spyOn(prisma.battery, 'findMany').mockResolvedValue(mockData)
    ;(groupDataBySerialNumber as jest.Mock).mockReturnValue(mockResult)

    const result = await resolver.batteryIssues()

    expect(result).toEqual(mockResult)
    expect(prisma.battery.findMany).toHaveBeenCalledTimes(1)
    expect(groupDataBySerialNumber).toHaveBeenCalledWith(mockData)
  })

  it('should mark as "wasRecharged" and set "averageDailyUsage" as "unknown" if there is an increase in battery levels.', () => {
    const mockData: BatteryRequestProps[] = [
      {
        academyId: 1,
        batteryLevel: 80,
        employeeId: '123',
        serialNumber: 'ABC123',
        timestamp: new Date('2023-06-01T10:00:00Z'),
      },
      {
        academyId: 1,
        batteryLevel: 70,
        employeeId: '123',
        serialNumber: 'ABC123',
        timestamp: new Date('2023-06-01T14:00:00Z'),
      },
      {
        academyId: 1,
        batteryLevel: 85,
        employeeId: '123',
        serialNumber: 'ABC123',
        timestamp: new Date('2023-06-02T10:00:00Z'),
      },
    ]

    const expectedResult: BatteryIssuesModel[] = [
      {
        academyId: 1,
        serialNumber: 'ABC123',
        needReplacement: false,
        dates: [
          {
            day: dayjs(mockData[0].timestamp).format('DD/MM/YYYY'),
            batteryLevels: [mockData[0].batteryLevel, mockData[1].batteryLevel],
            academyId: 1,
            wasRecharged: true,
            averageDailyUsage: 'unknown',
          },
          {
            day: dayjs(mockData[2].timestamp).format('DD/MM/YYYY'),
            batteryLevels: [mockData[2].batteryLevel],
            academyId: 1,
            wasRecharged: false,
            averageDailyUsage: 'unknown',
          },
        ],
      },
    ]

    jest.spyOn(prisma.battery, 'findMany').mockResolvedValue(mockData as any)
    ;(groupDataBySerialNumber as jest.Mock).mockReturnValue(expectedResult)

    const result = groupDataBySerialNumber(mockData)

    expect(result).toEqual(expectedResult)
  })

  it('should set "needReplacement" as true if the daily usage percentage is greater than 30.', () => {
    const mockDataNeedReplacement: BatteryRequestProps[] = [
      {
        academyId: 1,
        batteryLevel: 100,
        employeeId: '123',
        serialNumber: 'ABC123',
        timestamp: new Date('2023-06-01T10:00:00Z'),
      },
      {
        academyId: 1,
        batteryLevel: 80,
        employeeId: '123',
        serialNumber: 'ABC123',
        timestamp: new Date('2023-06-01T14:00:00Z'),
      },
      {
        academyId: 1,
        batteryLevel: 60,
        employeeId: '123',
        serialNumber: 'ABC123',
        timestamp: new Date('2023-06-02T10:00:00Z'),
      },
    ]

    const expectedResultWithNeedReplacement: BatteryIssuesModel[] = [
      {
        academyId: 1,
        serialNumber: 'ABC123',
        needReplacement: true,
        dates: [
          {
            day: dayjs(mockDataNeedReplacement[0].timestamp).format(
              'DD/MM/YYYY'
            ),
            batteryLevels: [
              mockDataNeedReplacement[0].batteryLevel,
              mockDataNeedReplacement[1].batteryLevel,
            ],
            academyId: 1,
            wasRecharged: false,
            averageDailyUsage: '20.00%',
          },
          {
            day: dayjs(mockDataNeedReplacement[2].timestamp).format(
              'DD/MM/YYYY'
            ),
            batteryLevels: [mockDataNeedReplacement[2].batteryLevel],
            academyId: 1,
            wasRecharged: false,
            averageDailyUsage: 'unknown',
          },
        ],
      },
    ]

    ;(groupDataBySerialNumber as jest.Mock).mockReturnValue(
      expectedResultWithNeedReplacement
    )

    const result = groupDataBySerialNumber(mockDataNeedReplacement)

    expect(result).toEqual(expectedResultWithNeedReplacement)
  })
})

describe('[@Resolver]: getAcademyIdWithMostReplacements', () => {
  it('should return the number of times each academyId appears for devices that need replacement', async () => {
    const entries: Entry[] = [
      { academyId: 30015, needReplacement: true, serialNumber: 'ASDB' },
      { academyId: 30015, needReplacement: true, serialNumber: 'ASAD' },
      { academyId: 30021, needReplacement: true, serialNumber: 'ASDB1' },
    ]

    const expectedResult: AcademyEntry[] = [
      {
        academyId: 30021,
        totalReplacements: 1,
        devices: ['ASDB1'],
      },
      {
        academyId: 30015,
        totalReplacements: 2,
        devices: ['ASDB', 'ASAD'],
      },
    ]

    ;(countAcademyIds as jest.Mock).mockReturnValue(expectedResult)

    const result = countAcademyIds(entries)

    expect(result).toStrictEqual(expectedResult)
  })
})
