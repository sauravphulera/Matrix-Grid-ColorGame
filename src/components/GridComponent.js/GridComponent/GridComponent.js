import { useEffect, useState } from 'react';
import './Grid.css';




function GridComponent() {
 const [columnHeaders, setColumnHeaders] = useState([[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]);
 const [rowHeaders, setRowHeaders] = useState([[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]);
 const [matrix, setMatrix] = useState([
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
 ]);

 const getCountArray = (arr) => {
	let counts = [];
    let countIndex = 0;
    counts[countIndex] = 0;
    for(let i=0;i<arr.length;i++) {
        if(arr[i] === 1) {
            counts[countIndex] += 1;
        }else {
            countIndex++;
            counts[countIndex] = 0
        }
    }
	for(let i=counts.length - 1; i>=1; i--) {
		if(counts[i] === 0) {
			counts.splice(i,1);
		}
	}
	for(let i=0; i< counts.length; i++) {
		if(counts[i] === 0) {
			counts.splice(i,1);
		}
	}
    return counts;
 }


 const getColHeaderArr  = (arr, index) => {
    let result = [];
    for(let i=0;i<arr.length; i++) {
        result.push(arr[i][index]);
    }
    return result;
 }
 


 const handleSlotClick = (i,j, rows) => {
	if(matrix[i][j] === 1) {
		return;
	}
	matrix[i][j] = 1;
	setMatrix([...matrix]);
	const countOfRowsArr = getCountArray(rows);


	// get count of clicks in rows
	rowHeaders[i] = countOfRowsArr;
	setRowHeaders([...rowHeaders]);

	//get count of click in columns
	const columns = getColHeaderArr(matrix, j);
	columnHeaders[j] = getCountArray(columns);
	setColumnHeaders([...columnHeaders]);
	console.log(columnHeaders[j]);
	//setColumnHeaders([...])
 }


  return (
		<div className='container'>
			<div className='grid'>

				{/*headers for columns to show column click counts*/}

				{
					columnHeaders.map((header,i) => {
						return <div className='box colHeaders' key={`header${i}`} style={{gridRow: 1, gridColumn: i+2}}>{header.map((count,i) => {
							return <div key={`count${i}`}>{count}</div>;
						})}</div>
					})
				}

				{/*headers for row to show counts	*/}

				{
					rowHeaders.map((header,i) => {
						return <div className='box rowHeaders' key={`row${i}`} style={{gridRow: i+2, gridColumn: 1}}>{header.map((count, i) => {
								return <>{count} {i=== (header.length-1) ? '': ','}</>;	
						})}</div>
					})
				}

				{/*matrix */}
				<div className='nested-grid box'>
					{
						matrix.map((rows, i) => {
							return rows.map((slot, j) => {
								return <div onClick={() => handleSlotClick(i,j, rows)} style={{background: matrix[i][j] === 1 ? 'green': 'white'}} key={`Matrix${i}${j}`} className='box'></div>
							})
						})
					}
				</div>

			</div>
		</div>
  );
}

export default GridComponent;