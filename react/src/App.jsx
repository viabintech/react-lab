import { useState } from 'react';

import FileUpload from './components/FileUpload';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { csvToArr } from './utils/csvToArr';

function App() {
	const [tableData, setTableData] = useState({
		cols: [],
		rows: []
	});

	const handleFileSelection = async (file) => {
		try {
			const data = await csvToArr(file);

			if (data.length > 0) {
				const columns = Object.keys(data[0]).map((it) => ({ field: it.toLowerCase(), headerName: it }));
				const rows = data.map((it) =>
					Object.fromEntries(Object.entries(it).map(([key, value]) => [key.toLowerCase(), value]))
				);
				
				setTableData({ cols: columns, rows });
			}
		} catch (error) {
			console.log('parsing err:', error);
		}
	};

	return (
		<Grid container sx={{ padding: 6 }}>
			<Grid size={{ xs: 12, sm: 4 }}>
				<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<FileUpload onChange={handleFileSelection} />
				</Box>
			</Grid>
			<Grid size={{ xs: 12, sm: 8 }}>
				<Box>
					<Paper sx={{ height: 400, width: '100%' }}>
						<DataGrid rows={tableData.rows} columns={tableData.cols} sx={{ border: 0 }} />
					</Paper>
				</Box>
			</Grid>
		</Grid>
	);
}

export default App;
