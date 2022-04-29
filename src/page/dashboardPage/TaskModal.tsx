import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TaskTypeSelect from 'components/taskTypeSelect/TaskTypeSelect';
import UserSelect from 'components/userSelect/UserSelect';
import React, { useEffect } from 'react';
import { useDeleteTask, useEditTask } from 'utils/task';
import { useTasksModal, useTasksQueryKey } from './util';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TaskModal = () => {
  const [form] = useForm();
  const { editingTask, editingTaskId, close, isLoading } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const { mutateAsync:deleteTask } = useDeleteTask(useTasksQueryKey());
  const startDelete = () => {
    close();
    Modal.confirm({
      okText: 'Confirm',
      cancelText: 'Cancel',
      title: 'Confirm to delete',
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTaskId, form]);
  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText="Confirm"
      cancelText="Cancel"
      confirmLoading={editLoading}
      title="Edit task"
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label="Task Name"
          name={'name'}
          rules={[{ required: true, message: 'Task Name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Manager" name={'proccessorId'}>
          <UserSelect defaultOptionName="Manager" />
        </Form.Item>
        <Form.Item label="Type" name={'typeId'}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={startDelete}>Delete</Button>
      </div>
    </Modal>
  );
};

export default TaskModal;
