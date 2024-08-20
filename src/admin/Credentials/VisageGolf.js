import React from 'react';
import PageHeader from '../components/PageHeader.js';
import { VccFactory } from '../../factory';
import Utils from '../../factory/Utils';

function VisageGolf() {
  const [courses, setCourses] = React.useState([]);
  const [credential, setCredential] = React.useState({
    domain_type: 'visagegolf',
    username: '',
    password: '',
    is_active: true
  });

  React.useEffect(() => {
    getCourses();
  }, []);
  
  // courses function 
  const getCourses = () => {
    Utils.showSpinner();
    VccFactory.getCourses({domain_type: 'visagegolf'})
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data);
        } else {
          Utils.showToast('warning', 1500, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 1500, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  const addClub = () => {
    Utils.showSpinner();
    VccFactory.addClub(credential)
      .then((res) => {
        if (res.status === 200) {
          getCourses();
          setCredential({
            domain_type: 'visagenet',
            username: '',
            password: '',
            is_active: true
          });
          Utils.showToast('success', 1500, res.message, '');
        } else {
          Utils.showToast('warning', 1500, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 1500, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  const removeClub = (id) => {
    Utils.showSpinner();
    VccFactory.removeClub({id: id})
      .then((res) => {
        if (res.status === 200) {
          getCourses();
          Utils.showToast('success', 1500, res.message, '');
        } else {
          Utils.showToast('warning', 1500, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 1500, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  return (
    <div className="courses">
      {/*  */}
      <PageHeader title="vcc.visage.golf" />
      <div className="card">
        <div className="card-body pb-0">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>club id</th>
                <th>club name</th>
                <th>course id</th>
                <th>course name</th>
                <th>username</th>
                <th>password</th>
                {/* <th>status</th> */}
                <th>action</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <input type="text" 
                    className="form-control" 
                    onChange={(e) => setCredential({...credential, username: e.target.value})}
                    value={credential.username}
                  />
                </th>
                <th>
                  <input type="text" 
                    className="form-control" 
                    onChange={(e) => setCredential({...credential, password: e.target.value})}
                    value={credential.password}
                  />
                </th>
                <th>
                  <button className="btn btn-primary"
                    onClick={() => addClub()}
                  >Add Credential</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {courses && courses.map((item, index) => 
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.club.site_id}</td>
                  <td>{item.club.site_name}</td>
                  <td>{item.course_id}</td>
                  <td>{item.course_name}</td>
                  <td>{item.club.username}</td>
                  <td>{item.club.password}</td>
                  <td>
                    <button className="btn btn-danger"
                      onClick={() => removeClub(item.club_id)}
                    >Remove</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default VisageGolf;
