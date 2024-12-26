import React, { FC } from 'react';
import { Avatar, Card, Col, Row, Skeleton, Statistic } from 'antd';
import useStyles from './style.style';
import { PageContainer } from '@ant-design/pro-components';
import { Link } from '@umijs/max';

const PageHeaderContent: FC = () => {
  const { styles } = useStyles();
  const loading = true; // TODO: 需改为动态

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          size="large"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>早安，xxx，祝你开心每一天！</div>
        <div>交互专家 |蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
      </div>
    </div>
  );
};

const ExtraContent: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="项目数" value={56} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="团队内排名" value={8} suffix="/ 24" />
      </div>
      <div className={styles.statItem}>
        <Statistic title="项目访问" value={2223} />
      </div>
    </div>
  );
};
const WorkSpace: React.FC = () => {
  return (
    <PageContainer content={<PageHeaderContent />} extraContent={<ExtraContent />}>
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="进行中的课程"
            extra={<Link to="/admin">全部课程</Link>}
            bordered={false}
            style={{
              marginBottom: 24,
            }}
          >
            123
          </Card>
          <Card title="动态" bordered={false}>
            456
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          456
        </Col>
      </Row>
    </PageContainer>
  );
};

export default WorkSpace;
