import styles from './Home.module.scss'
import { useState } from 'react'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Button, Input } from '@mui/material'
import moment from 'moment'
export function Home() {
  const [valueAverbation, setValueAverbation] = useState('0')
  const [pedagio, setPedagio] = useState('')
  const [averbaçoesMeses, setAverbaçoesMeses] = useState(0)
  const [value, setValue] = useState<any>(dayjs(''))

  const tollCalculation = () => {
    const inclusionDate = `${value.year()}/${value.month() + 1}/${value.date()}`
    const averbationsToDay = averbaçoesMeses * 30.4167
    const diferenceAtDates = moment('2022/01/01', 'YYYY/MM/DD').diff(
      moment(inclusionDate, 'YYYY/MM/DD'),
    )
    const dias = moment.duration(diferenceAtDates).asDays()

    const tempodeContribuicaoTotal = dias + averbationsToDay

    if (dias / 365 >= 25) {
      const diasatecompletaranos =
        Date.parse('2022-01-01') - Date.parse('1994-01-01')
      const diasdepedagio = diasatecompletaranos * 0.17
      const newDateTeste = moment('01/01/2022').add(
        diasdepedagio + diasatecompletaranos,
        'days',
      )

      console.log(diasatecompletaranos)
    }
  }
  const addAverbations = () => {
    const addAverbationsTeste = averbaçoesMeses + parseInt(valueAverbation)
    setAverbaçoesMeses(addAverbationsTeste)
    setValueAverbation('0')
  }
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeContainer}>
        <main>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Data de inclusão"
                value={value}
                onChange={(newValue: any) => setValue(newValue)}
                slotProps={{
                  textField: {
                    helperText: 'MES / DIA / ANO',
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div>
            <p>Averbacoes em meses</p>
            <Input
              value={valueAverbation}
              onChange={(e: any) => setValueAverbation(e.target.value)}
              type="text"
            />
            <Button onClick={addAverbations} variant="outlined">
              ADICIONAR AVERBACÕES
            </Button>
          </div>
          <Button
            sx={{ width: '100%', maxWidth: '320px' }}
            variant="outlined"
            onClick={tollCalculation}
          >
            CALCULAR
          </Button>
          <p>MESES AVERBADO {averbaçoesMeses}</p>
          <p>Data no qual o militar poderá dar entrada na reserva{pedagio}</p>
        </main>
      </div>
    </div>
  )
}
