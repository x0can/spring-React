import { Component } from "react";
import { Table, Avatar, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getAllStudents } from "./client";
import Container from "./Container";
import Footer from "./Footer";

const getIndicatorIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const columns = [
  {
    title: "",
    key: "avatar",
    render: (text, student) => (
      <Avatar size="large">
        {`${student.firstName.charAt(0).toUpperCase()}${student.lastName
          .charAt(0)
          .toUpperCase()}`}
      </Avatar>
    ),
  },
  {
    title: "Student Id",
    dataIndex: "studentId",
    key: "studentId",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
];

class App extends Component {
  state = {
    students: null,
    isFetching: false,
    numberOfStudents: 0,
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    this.setState({
      isFetching: true,
    });
    getAllStudents()
      .then((res) => res.json())
      .then((students) => {
        this.setState({
          students,
          isFetching: false,
          numberOfStudents: students.length,
        });
      });
  };

  render() {
    const { students, isFetching, numberOfStudents } = this.state;

    return (
      <div>
        {!isFetching ? (
          <Container>
            <Table
              dataSource={students}
              columns={columns}
              rowKey="studentId"
              pagination={false}
            />
            <Footer numberOfStudents={numberOfStudents} />
          </Container>
        ) : (
          <Container>
            <Spin indicator={getIndicatorIcon} />
          </Container>
        )}
      </div>
    );
  }
}

export default App;
