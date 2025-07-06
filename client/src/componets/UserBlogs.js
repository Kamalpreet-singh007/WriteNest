/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Blogs from './Blogs';
import Blog from './Blog';
import { makeStyles } from '@mui/styles';
import config from '../config';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px auto',
    width: '80%',
  },
  blogContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  blogImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  editButton: {
    background: '#f0f0f0',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '14px',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: 'red',
    cursor: 'pointer',
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const id = localStorage.getItem('userId');

  const sendRequest = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res?.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data?.user));
  }, []);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={true}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
