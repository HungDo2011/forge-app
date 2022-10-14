import { useDispatch } from 'react-redux';
import { Popover, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { uploadObject } from 'untils/request';
import { removeBucket, removeObject } from 'untils/request';
import { changeRefreshTree } from 'redux/Refresh/refreshSlice';

const typographyStyle = {
    margin: '0',
    padding: '4px 8px',
    background: '#f5f5f5',
    border: '1px solid #979797',
    boxShadow: '2px 2px 2px #999',
    zIndex: 2000,
    cursor: 'pointer',
};

function PopoverMenu({ data, open, anchorEl, onClose }) {
    const dispatch = useDispatch();

    const handleUploadFile = async (event) => {
        onClose();
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const bucketId = data.id;

            await uploadObject(file, bucketId, dispatch);
        }
    };

    const handleRemove = (data) => {
        onClose();

        switch (data.type) {
            case 'bucket':
                removeBucket(data, dispatch);
                break;

            case 'object':
                removeObject(data, dispatch);
                break;

            default:
                return;
        }
        dispatch(changeRefreshTree(true));
    };

    return (
        <Popover
            id={data.id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {data.type === 'bucket' && (
                <Typography className="popoverItem" sx={typographyStyle} component={'div'} variant={'body2'}>
                    <label htmlFor="upload" style={{ cursor: 'pointer' }}>
                        <span
                            style={{
                                paddingRight: 4,
                                marginRight: 4,
                                borderRight: '1px solid #979797',
                            }}
                        >
                            <CloudUploadIcon />
                        </span>
                        Upload file.
                        <form id="form" encType="multipart/form-data">
                            <input
                                id="upload"
                                type="file"
                                onChange={handleUploadFile}
                                name="fileToUpload"
                                style={{ display: 'none' }}
                            />
                        </form>
                    </label>
                </Typography>
            )}

            <Typography component={'div'} sx={typographyStyle} variant={'body2'} onClick={() => handleRemove(data)}>
                <span
                    style={{
                        paddingRight: 4,
                        marginRight: 4,
                        borderRight: '1px solid #979797',
                    }}
                >
                    <DeleteForeverIcon />
                </span>
                Delete file.
            </Typography>
        </Popover>
    );
}

export default PopoverMenu;
