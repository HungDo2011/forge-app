/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { TreeItem, TreeView } from '@mui/lab';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DescriptionIcon from '@mui/icons-material/Description';

import { request } from 'untils/request';
import { refreshSelector } from 'redux/Refresh/refreshSelector';
import { changeBootScreen, changeRefreshTree } from 'redux/Refresh/refreshSlice';
import PopoverMenu from './Popover/PopoverMenu';
import { CloseSquare, MinusSquare, PlusSquare } from './Popover/StyledTreeItem';
import { getForgeToken, translateObject } from 'untils/request';
import { launchViewer } from 'component/Body/ViewForge/ForgeView';
import axios from 'axios';
import { setUrnLink } from 'redux/UrnLink/urnSlice';

function ForgeTree() {
    const [openModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dataPopover, setDataPopover] = useState({});

    const [loading, setLoading] = useState(true);
    const [buckets, setBuckets] = useState([]);

    const dispatch = useDispatch();

    const refresh = useSelector(refreshSelector);

    useEffect(() => {
        if (!refresh) {
            setBuckets([]);
            setLoading(true);
        }
    }, [refresh]);

    useEffect(() => {
        setLoading(true);

        if (buckets.length <= 0) {
            request
                .get('oss/buckets')
                .then((res) => {
                    setBuckets(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        buckets.map((bucket) => {
            request
                .get('oss/buckets', {
                    params: {
                        id: bucket.id || '#',
                    },
                })
                .then((res) => {
                    bucket.children = res.data;
                    setLoading(false);
                })

                .catch((err) => {
                    console.log(err);
                });
        });
    }, [buckets, refresh]);

    useEffect(() => {
        setBuckets(buckets);
        dispatch(changeRefreshTree(false));
    }, [refresh]);

    const handleContextMenu = (e, data) => {
        e.preventDefault();
        setDataPopover(data);
        setAnchorEl(e.currentTarget);
        setOpenModal(true);
    };

    const handleReadFile = (e, data) => {
        e.preventDefault();
        dispatch(setUrnLink(data.id));
        dispatch(changeBootScreen(false));
        translateObject(data);

        getForgeToken(function (access_token) {
            axios
                .get(`https://developer.api.autodesk.com/modelderivative/v2/designdata/${data.id}/manifest`, {
                    headers: { Authorization: 'Bearer ' + access_token },
                })
                .then((res) => {
                    if (res.status === 'success') launchViewer(data.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    };

    return (
        <div>
            {loading && <Spin spinning tip="Loading..." style={{ marginTop: 10 }} />}

            {!loading && (
                <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<MinusSquare />}
                    defaultExpandIcon={<PlusSquare />}
                    defaultEndIcon={<CloseSquare />}
                >
                    {buckets.map((bucket) => {
                        return (
                            <div key={bucket.id}>
                                <TreeItem
                                    key={bucket.id}
                                    nodeId={bucket.id}
                                    label={
                                        <>
                                            <p
                                                style={{ textAlign: 'left', margin: '2px 0' }}
                                                onContextMenu={(e) => handleContextMenu(e, bucket)}
                                            >
                                                <FolderOpenIcon
                                                    key={bucket.id}
                                                    style={{
                                                        width: 20,
                                                        marginRight: 8,
                                                    }}
                                                />
                                                {bucket.text}
                                            </p>
                                            <PopoverMenu
                                                data={dataPopover}
                                                open={openModal}
                                                anchorEl={anchorEl}
                                                onClose={() => setOpenModal(false)}
                                            />
                                        </>
                                    }
                                >
                                    {bucket.children.map((child, index) => {
                                        let Icon = '';
                                        if (child.type === 'bucket') {
                                            Icon = FolderOpenIcon;
                                        } else {
                                            Icon = DescriptionIcon;
                                        }
                                        return (
                                            <div key={index}>
                                                <TreeItem
                                                    key={index}
                                                    sx={{ overflow: 'hidden' }}
                                                    nodeId={child.id}
                                                    label={
                                                        <>
                                                            <p
                                                                style={{ textAlign: 'left', margin: '2px 0' }}
                                                                onContextMenu={(e) => handleContextMenu(e, child)}
                                                                onDoubleClick={(e) => handleReadFile(e, child)}
                                                            >
                                                                <Icon
                                                                    key={child.id}
                                                                    style={{
                                                                        width: 14,
                                                                        marginRight: 8,
                                                                    }}
                                                                />
                                                                {child.text}
                                                            </p>
                                                            <PopoverMenu
                                                                data={dataPopover}
                                                                open={openModal}
                                                                anchorEl={anchorEl}
                                                                onClose={() => setOpenModal(false)}
                                                            />
                                                        </>
                                                    }
                                                ></TreeItem>
                                            </div>
                                        );
                                    })}
                                </TreeItem>
                            </div>
                        );
                    })}
                </TreeView>
            )}
        </div>
    );
}

export default ForgeTree;
