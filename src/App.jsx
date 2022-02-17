import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('')
  const [tags, setTags] = useState([])

  function extractProperties(html) {
    const properties = []
    const regex = "([0-9A-Z0-9a-z0-9]+):([0-9A-Z0-9a-z0-9]+)"
    while (html.match(regex)) {
      const property = html.match(regex)[0]
      const key = property.split(":")[0]
      const value = property.split(":")[1]
      properties.push({ [key]: value })
      html = html.replace(property, "")
    }
    setTags(properties)
    return properties
  }

  const tagList = tags.map((tag, index) => {
    return <TableRow key={index}>
      <TableCell align="center">{Object.keys(tag)[0]}</TableCell>
      <TableCell align="center">{Object.values(tag)[0]}</TableCell>
    </TableRow>
  })

  function handleChange(e) {
    setText(e.target.value)
    extractProperties(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tag Extractor</h1>
        <p>Paste your HTML snippet below to automatically extract key:value tags into the table.</p>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={25}
          defaultValue={text}
          style={{ width: '40ch' }}
          variant="outlined"
          onChange={handleChange}
        />
        <br />
        <TableContainer component={Paper}>
          <Table className="tags" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontSize: '20px' }}><strong>Tag Name</strong></TableCell>
                <TableCell align="center" style={{ fontSize: '20px' }}><strong>Value</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tagList}
            </TableBody>
          </Table>
        </TableContainer>
      </header>
    </div>
  )
}

export default App
