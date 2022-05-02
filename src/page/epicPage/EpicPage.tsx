import { Button, List, Modal } from 'antd';
import Row from 'components/row/Row';
import dayjs from 'dayjs';
import { ScreenContainer } from 'page/dashboardPage/DashboardPage';
import { useProjectInUrl } from 'page/dashboardPage/util';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Epic } from 'types/Epic';
import { useDeleteEpic, useEpics } from 'utils/epic';
import CreateEpic from './CreateEpic';

const EpicPage = () => {
   const { data: currentProject } = useProjectInUrl();
   const { data: epics } = useEpics(useEpicSearchParams());
   const { data: tasks } = useTasks({ projectId: currentProject?.id });
   const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
   const [epicCreateOpen, setEpicCreateOpen] = useState(false);

   const confirmDeleteEpic = (epic: Epic) => {
     Modal.confirm({
       title: `Comfirm delete prject group：${epic.name}`,
       content: 'Click to Confirm',
       okText: 'Confirm',
       onOk() {
         deleteEpic({ id: epic.id });
       },
     });
   };

   return (
     <ScreenContainer>
       <Row between={true}>
         <h1>{currentProject?.name}Task Group</h1>
         <Button onClick={() => setEpicCreateOpen(true)} type={'link'}>
           Create new...
         </Button>
       </Row>
       <List
         style={{ overflow: 'scroll' }}
         dataSource={epics}
         itemLayout={'vertical'}
         renderItem={(epic) => (
           <List.Item>
             <List.Item.Meta
               title={
                 <Row between={true}>
                   <span>{epic.name}</span>
                   <Button
                     onClick={() => confirmDeleteEpic(epic)}
                     type={'link'}
                   >
                     Delete
                   </Button>
                 </Row>
               }
               description={
                 <div>
                   <div>Start: {dayjs(epic.start).format('YYYY-MM-DD')}</div>
                   <div>End: {dayjs(epic.end).format('YYYY-MM-DD')}</div>
                 </div>
               }
             />
             <div>
               {tasks
                 ?.filter((task: { epicId: number; }) => task.epicId === epic.id)
                 .map((task: { id: React.Key | null | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                   <Link
                     to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                     key={task.id}
                   >
                     {task.name}
                   </Link>
                 ))}
             </div>
           </List.Item>
         )}
       />
       <CreateEpic
         onClose={() => setEpicCreateOpen(false)}
         visible={epicCreateOpen}
       />
     </ScreenContainer>
   );
};

export default EpicPage

function useEpicSearchParams(): any {
  throw new Error('Function not implemented.');
}
function useTasks(arg0: { projectId: number | undefined; }): { data: any; } {
  throw new Error('Function not implemented.');
}

function useEpicsQueryKey(): import("react-query").QueryKey {
  throw new Error('Function not implemented.');
}

