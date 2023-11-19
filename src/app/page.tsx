"use client"

import styles from './page.module.css'
import { useState } from 'react';

const Parser = require('expr-eval').Parser;

const rowParser = (text, row) =>  {

  const parser = new Parser();

  const lines = text.split(";");
  for (let i=0; i < lines.length -1; i++) {
    const lineSplit = lines[i].split("=");
    const varName = lineSplit[0];

    const formula = lineSplit[1];
    const expr = parser.parse(formula);

    const res = expr.evaluate(row);
    row[varName] = res;
  }
  return row;
};

const Table = ({values, titles, sortFunc}) => {
  return (
    <table>
      <thead>
        <tr>
          {
            titles.map(t => <th onClick={() => sortFunc(t)}>{t}</th>)
          }
        </tr>
      </thead>
      <tbody>
         {
           values.map(v => <tr>{titles.map(t => <td>{v[t]}</td>)}</tr>)
         }
      </tbody>
    </table>
  )
};

export default function Home() {

  const [values, setValues] = useState([]);
  const [titles, setTitles] = useState([]);
  const [file, setFile] = useState(null);
  const [formula, setFormula] = useState('');

  const sortFunc = (col) => {
      const vals = [...values];
      vals.sort((a, b) => b[col] - a[col]);
      setValues(vals);
  }

  const formulaChange = (event) => {
    setFormula(event.target.value);
  }

  const uploadToClient = (event) => {
    if (formula == '') {
       window.alert('Formula cannot be blank');
       return;
    } else {
      if (event.target.files && event.target.files[0]) {
	setFile(event.target.files[0]);
      }
    }
  }

  const run = () => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
	const contents = reader.result;
	const parser = new DOMParser();
	const parsedDocument = parser.parseFromString(contents, "text/html");
	const table = parsedDocument.getElementsByTagName("table");

	const data = {}

	const tableHeaders = parsedDocument.getElementsByTagName("th");
	const titles = [];
	for (let i = 0; i < tableHeaders.length; i++) {
	  titles.push(tableHeaders[i].innerText);
	}

	const values = [];
	const tableRows = parsedDocument.getElementsByTagName("tr");
	for (let i = 1; i < tableRows.length; i++) {
	  const tableRowValues = tableRows[i].getElementsByTagName("td");
	  const tmp = {};
	  for (let j = 0; j < tableRowValues.length; j++) {
	    tmp[titles[j]] = tableRowValues[j].innerText;
	  }
	  values.push(tmp);
	}

	values.map(val => rowParser(formula, val));
	setValues(values);
	setTitles(Object.keys(values[0]));
      },
      false,
    );
    reader.readAsText(file);
  };

  return (
    <main>
      <div>
        <textarea name="formula" rows={4} cols={40} onChange={formulaChange} />
      </div>
      <div>
        <ul>
          <li>Do not use any spaces</li>
          <li>Formula must start with variable name and then equals</li>
          <li>Every formula must end with semi-colon</li>
          <li>Will only work with numerical columns, does not include transfer value</li>
          <li>Example: test=Acc+Agi;test2=Nat/Pac;test3=(test*2)*test2;</li>
          <li>Click column title to sort in descending order</li>
          <li>Must export HTML format files</li>
        </ul>
      </div>
      <div>
	<input type="file" accept="html" name="data" onChange={uploadToClient} />
	<button onClick={() => run()}>Run</button>
      </div>
      <div>
	{
	   values ? (<Table titles={titles} values={values} sortFunc={sortFunc} />) : null
	}
      </div>
    </main>
  )
}
