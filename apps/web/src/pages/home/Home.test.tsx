import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { HomePage } from './Home.page'
import '@testing-library/jest-dom/extend-expect'
import { GET_BATTERIES_ISSUES } from './queries/batteries-issues'
import { describe, test, expect } from 'vitest'

const mockData = {
  getAcademyIdWithMostReplacements: [
    {
      academyId: '30015',
      devices: ['ASDB', 'ASAD'],
      totalReplacements: 2,
    },
    {
      academyId: '30006',
      devices: ['4422', '1123123'],
      totalReplacements: 2,
    },
  ],
}

const mockError = new Error('An error occurred')

const mocks = [
  {
    request: {
      query: GET_BATTERIES_ISSUES,
    },
    result: {
      data: mockData,
    },
  },
]

describe('HomePage', () => {
  test('should render loading state and then display the data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomePage />
      </MockedProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      screen.logTestingPlaygroundURL()
      expect(screen.queryByText('Loading...')).toBeNull()
      expect(screen.getAllByText(/academy id/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/academy id/i)[1]).toBeInTheDocument()
      expect(screen.getAllByText('Total problem')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Total problem')[1]).toBeInTheDocument()

      const detailsFirstColumn = screen.getAllByText('Details')[0]
      const detailsSecondColumn = screen.getAllByText('Details')[1]
      expect(detailsFirstColumn).toBeInTheDocument()
      expect(detailsSecondColumn).toBeInTheDocument()

      fireEvent.click(detailsFirstColumn)
      fireEvent.click(detailsSecondColumn)

      expect(screen.getByText('ASDB')).toBeInTheDocument()
      expect(screen.getByText('ASAD')).toBeInTheDocument()
      expect(screen.getByText('4422')).toBeInTheDocument()
      expect(screen.getByText('1123123')).toBeInTheDocument()
    })
  })

  test('should render the error message when there is an error', async () => {
    render(
      <MockedProvider mocks={[{ ...mocks[0], error: mockError }]}>
        <HomePage />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(
        screen.getByText(`Error : ${mockError.message}`)
      ).toBeInTheDocument()
    })
  })
})
