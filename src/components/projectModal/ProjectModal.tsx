
import { Drawer } from 'antd';
import React from 'react';

const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      width={'100%'}
      visible={props.projectModalOpen}
    ></Drawer>
  );
};



export default ProjectModal;
