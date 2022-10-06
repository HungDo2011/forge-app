import { Popover, Typography } from '@mui/material';

const styleTypography = {
    margin: '0px',
    padding: '8px',
    border: '1px solid #333',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
};

function PopoverUser({ id, open, anchorEl, onClose }) {
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => onClose()}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            sx={{
                borderRadius: '20%',
            }}
        >
            <Typography variant={'body2'} sx={styleTypography} component={'div'}>
                <h4
                    style={{
                        maxHeight: '20px',
                        lineHeight: '1.5',
                        fontSize: 14,
                        fontWeight: 800,
                        color: '#02641b',
                        cursor: 'default',
                    }}
                >
                    @.{localStorage.getItem('userName') ?? ''}
                </h4>
                <p style={{ margin: 0, fontSize: 12, cursor: 'default' }}>Email: {localStorage.getItem('userEmail') ?? ''}</p>
            </Typography>
        </Popover>
    );
}

export default PopoverUser;
