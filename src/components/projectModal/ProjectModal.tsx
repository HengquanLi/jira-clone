
import { Drawer } from 'antd';
import { projectListActions, selectProjectModalOpen } from 'page/projectListPage/projectList.slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      width={'100%'}
      visible={projectModalOpen}
    ></Drawer>
  );
};



export default ProjectModal;
