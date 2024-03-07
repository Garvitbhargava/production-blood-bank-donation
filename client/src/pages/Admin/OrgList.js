import React, { useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import moment from "moment";
import API from "../../services/api";

const OrgList = () => {
  const [data, setData] = useState([]);
  //find donar records

  const getDonar = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      if (data?.success) {
        console.log(data);
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDonar();
  }, []);

  //DELETE

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure Want To Delete This hospital",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.loh(error);
    }
  };

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>

            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organizationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>

              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default OrgList;
