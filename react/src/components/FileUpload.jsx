import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onChange }) => {
	const VisuallyHiddenInput = styled('input')({
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: 1
	});

	const handleFileSelection = (e) => {
		onChange(e.target.files[0]);
		// reset selected file
		e.target.value = null;
	};

	return (
		<Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
			Upload CSV
			<VisuallyHiddenInput type='file' accept='.csv' onChange={handleFileSelection} />
		</Button>
	);
};

export default FileUpload;
