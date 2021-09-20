import Chart from '../LineChart'

export const getChartType = (props) => {
  const {
    selectedProtocol,
    activeDataType,
    data,
    setValue,
    latestPrice,
    setParsedDate,
    parsedDate,
  } = props
  switch (activeDataType) {
    case 'Volume 24H':
      return (
        <div>
          <h1 style={{ color: 'white' }}>Volume 24h</h1>
        </div>
      )
      break
    case 'Total Volume Locked':
      return (
        <div>
          <h1 style={{ color: 'white' }}>Total Volume Locked</h1>
        </div>
      )
    default:
      return (
        <Chart
          data={chartData['data']}
          setValue={setValue}
          latestPrice={latestPrice}
          setParsedDate={setParsedDate}
          parsedDate={parsedDate}
          selectedProtocol={selectedProtocol}
        />
      )
  }
}
