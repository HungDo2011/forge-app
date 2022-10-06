import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { createNewBucket } from 'untils/request';
import { useDispatch } from 'react-redux';
import { changeRefreshTree } from 'redux/Refresh/refreshSlice';

const styleModal = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const btnCloseStyle = {
    marginTop: '-2px',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    opacity: '0.2',
    border: 0,
};

function CreateBucket() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useDispatch();

    const handleClose = () => setOpen(false);

    const handleCreateNewBucket = async () => {
        const newBucket = { bucketKey: `${value}` };
        await createNewBucket(newBucket, dispatch);
        setOpen(false);
        setValue('');
        dispatch(changeRefreshTree(false));
    };

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                className="btn-create"
                sx={{
                    color: '#fff',
                    backgroundColor: '#5bc0de',
                    borderColor: '#46b8da',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    height: '100%',
                    float: 'right',
                    padding: '1px 5px',
                    textTransform: 'unset',
                }}
            >
                <FolderIcon style={{ width: 18, marginRight: 2 }} />
                New bucket
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                }}
            >
                <Fade in={open}>
                    <Box sx={styleModal}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="myModalLabel">
                                        Create new bucket
                                    </h4>
                                    <button
                                        type="button"
                                        style={btnCloseStyle}
                                        data-dismiss="modal"
                                        aria-label="Cancel"
                                        onClick={handleClose}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <input
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value}
                                    className="form-control"
                                    style={{ margin: '20px 0' }}
                                />

                                <div className="modal-body">
                                    <p id="newBucketKey" className="form-content" style={{ whiteSpace: 'break-spaces' }}>
                                        For demonstration purposes, objects files are NOT automatically translated. After you upload, right
                                        click on the object and select "Translate". Note: Technically your bucket name is required to be
                                        globally unique across the entire platform - to keep things simple with this tutorial your client ID
                                        will be prepended by default to your bucket name and in turn masked by the UI so you only have to
                                        make sure your bucket name is unique within your current Forge app.
                                    </p>
                                </div>
                                <div className="modal-footer" style={{ margin: '30px 0 10px' }}>
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleClose}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" id="createNewBucket" onClick={handleCreateNewBucket}>
                                        Go ahead, create the bucket
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default CreateBucket;
