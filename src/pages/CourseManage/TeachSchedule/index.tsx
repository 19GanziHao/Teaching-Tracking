import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProFormSegmented } from '@ant-design/pro-components';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, InputNumber } from 'antd';

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

export type DataSourceType = {
  id: React.Key | number | undefined;
  /** 校历周次 */
  calendarWeek?: string;
  /** 某周是几月几号 */
  weekDate?: string;
  /** 理论学时 */
  theoreticalHours?: number;
  /** 实验学时 */
  experimentalHours?: number;
  /** 课外学时 */
  extracurricularHours?: number;
  /** 教学内容安排 */
  teachingContent?: string;
  /** 教学形式及其手段 */
  teachingMethods?: string;
  /** 作业或辅导安排 */
  homeworkArrangement?: string;
  /** 执行情况 */
  executionStatus?: string;
  /** 备注 */
  remarks?: string;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
  render?: React.ReactNode;
  sort?: string;
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

interface TeachScheduleProps {
  dataSource: DataSourceType[];
  setDataSource: React.Dispatch<React.SetStateAction<DataSourceType[]>>;
}

const TeachSchedule: React.FC<TeachScheduleProps> = ({
  dataSource,
  setDataSource,
}: {
  dataSource: DataSourceType[];
  setDataSource: React.Dispatch<React.SetStateAction<DataSourceType[]>>;
}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const actionRef = useRef<ActionType>();
  console.log(dataSource);
  const columns: ProColumns<DataSourceType>[] = [
    {
      key: 'sort',
      dataIndex: 'sort',
      width: '5%',
      readonly: true,
      align: 'center',
      render: () => <DragHandle />,
    },
    {
      title: '校历周次',
      dataIndex: 'calendarWeek',
      width: '7%',
    },
    {
      title: '学时数',
      children: [
        {
          title: '理论',
          dataIndex: 'theoreticalHours',
          width: '7%',
          formItemProps: {
            rules: [
              {
                required: true,
                message: '此项为必填项',
              },
            ],
          },
          renderFormItem: () => <InputNumber style={{ width: '100%' }} />,
        },
        {
          title: '实验',
          dataIndex: 'experimentalHours',
          width: '7%',
          formItemProps: {
            rules: [
              {
                required: true,
                message: '此项为必填项',
              },
            ],
          },
          renderFormItem: () => <InputNumber style={{ width: '100%' }} />,
        },
        {
          title: '课外',
          dataIndex: 'extracurricularHours',
          width: '7%',
          formItemProps: {
            rules: [
              {
                required: true,
                message: '此项为必填项',
              },
            ],
          },
          renderFormItem: () => <InputNumber style={{ width: '100%' }} />,
        },
      ],
    },

    {
      title: '教学内容安排',
      dataIndex: 'teachingContent',
      width: '40%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      align: 'center',
    },
    {
      title: '教学形式及其手段',
      dataIndex: 'teachingMethods',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '作业或辅导安排',
      dataIndex: 'homeworkArrangement',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '执行情况',
      dataIndex: 'executionStatus',
      width: '8%',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: '20%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id as React.Key);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.id === active?.id);
        const overIndex = prevState.findIndex((record) => record.id === over?.id);
        console.log(activeIndex, overIndex);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((i) => ({ id: i.id as UniqueIdentifier }))}
          strategy={verticalListSortingStrategy}
        >
          <EditableProTable<DataSourceType>
            actionRef={actionRef}
            components={{ body: { row: Row } }}
            rowKey="id"
            bordered
            sticky
            headerTitle="课表"
            scroll={{
              x: 1200,
            }}
            recordCreatorProps={
              position !== 'hidden'
                ? {
                    position: position as 'top',
                    record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                  }
                : false
            }
            loading={false}
            toolBarRender={() => [
              <ProFormSegmented
                key="render"
                fieldProps={{
                  style: {
                    marginBlockEnd: 0,
                  },
                  value: position,
                  onChange: (value) => {
                    setPosition(value as 'top');
                  },
                }}
                noStyle
                request={async () => [
                  {
                    label: '添加到顶部',
                    value: 'top',
                  },
                  {
                    label: '添加到底部',
                    value: 'bottom',
                  },
                  {
                    label: '隐藏',
                    value: 'hidden',
                  },
                ]}
              />,
            ]}
            columns={columns}
            value={dataSource}
            onChange={(value: readonly DataSourceType[]) => {
              setDataSource([...value]);
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              actionRender: (row, config, dom) => [dom.save, dom.cancel],
              onChange: setEditableRowKeys,
            }}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};

export default TeachSchedule;
