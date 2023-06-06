export interface Entry {
  academyId: number
  needReplacement: boolean
  serialNumber: string
}

export interface AcademyEntry {
  academyId: number
  totalReplacements: number
  devices: string[]
}

export function countAcademyIds(entries: Entry[]): AcademyEntry[] {
  const counts: { [key: number]: AcademyEntry } = {}

  for (const entry of entries) {
    const { academyId, serialNumber } = entry

    if (counts[academyId]) {
      counts[academyId].totalReplacements++
      counts[academyId].devices.push(serialNumber)
    } else {
      counts[academyId] = {
        academyId,
        totalReplacements: 1,
        devices: [serialNumber],
      }
    }
  }

  const result = Object.values(counts)
  result.sort((a, b) => b.totalReplacements - a.totalReplacements)

  return result
}
