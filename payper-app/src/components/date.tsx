import { parseISO, format } from 'date-fns'

function DateComponent({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  console.log('dateIso', date)
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default DateComponent;