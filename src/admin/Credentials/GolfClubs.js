import React from 'react';
import PageHeader from '../components/PageHeader';
import TableOrderBy from '../components/TableOrderBy';
import { VccFactory } from '../../factory';
import Utils from '../../factory/Utils';

function GolfClubs() {
  const [courses, setCourses] = React.useState([]);
  const [credential, setCredential] = React.useState({
    domain_type: 'visagenet',
    username: '',
    password: '',
    is_active: true
  });
  const [searchParam, setSearchParam] = React.useState({
    order_column: 'site_name',
    order_by: 'ASC'
  });
  React.useEffect(() => {
    getCourses(searchParam);
  }, [searchParam]);

  const handleOrderBy = (column, orderBy) => {
    var search = {...searchParam};
    search["order_column"] = column;
    search["order_by"] = orderBy;
    setSearchParam(search);
    getCourses(search);
  }
  
  // courses function 
  const getCourses = (searchParam) => {
    Utils.showSpinner();
    VccFactory.getCourses(searchParam)
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data);
        } else {
          Utils.showToast('warning', 3000, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 3000, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  const addClub = () => {
    Utils.showSpinner();
    VccFactory.addClub(credential)
      .then((res) => {
        if (res.status === 200) {
          getCourses(searchParam);
          setCredential({...credential, username: '', password: ''});
          Utils.showToast('success', 2500, res.message, '');
        } else {
          Utils.showToast('warning', 3000, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 3000, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  const removeClub = (id) => {
    Utils.showSpinner();
    VccFactory.removeClub({id: id})
      .then((res) => {
        if (res.status === 200) {
          getCourses(searchParam);
          Utils.showToast('success', 2500, res.message, '');
        } else {
          Utils.showToast('warning', 3000, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 3000, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  const syncClubTables = (club_id) => {
    Utils.showSpinner();
    VccFactory.syncClubTables({club_id: club_id})
      .then((res) => {
        if (res.status === 200) {
          // Utils.showToast('success', 2500, res.message, '');
          // PinCoordinatesProd
          console.log('PinCoordinatesProd - err: ', res.PinCoordinatesProd?.errorMessage);
          if (res.PinCoordinatesProd?.status === 200) {
            Utils.showToast('success', 2500, `${res.PinCoordinatesProd.body} table was synced successfully.`, '');
          } else if(res.PinCoordinatesProd?.errorMessage.includes("Task timed out")) {
            Utils.showToast('warning', 3000, `PinCoordinatesProd - Task timed out.`, '');
          } else {
            Utils.showToast('warning', 3000, res.PinCoordinatesProd?.errorMessage, '');
          }
          // PinRotationsProd
          setTimeout(function() {
            console.log('PinRotationsProd - err: ', res.PinRotationsProd?.errorMessage);
            if (res.PinRotationsProd?.status === 200) {
              Utils.showToast('success', 2500, `${res.PinRotationsProd.body} table was synced successfully.`, '');
            } else if(res.PinRotationsProd?.errorMessage.includes("Task timed out")) {
              Utils.showToast('warning', 3000, `PinRotationsProd - Task timed out.`, '');
            } else {
              Utils.showToast('warning', 3000, res.PinRotationsProd?.errorMessage, '');
            }
          }, 300);
          // CourseActivityProd
          setTimeout(function() {
            console.log('CourseActivityProd - err: ', res.CourseActivityProd?.errorMessage);
            if (res.CourseActivityProd?.status === 200) {
              Utils.showToast('success', 2500, `${res.CourseActivityProd.body} table was synced successfully.`, '');
            } else if(res.CourseActivityProd?.errorMessage.includes("Task timed out")) {
              Utils.showToast('warning', 3000, `CourseActivityProd - Task timed out.`, '');
            } else {
              Utils.showToast('warning', 3000, res.CourseActivityProd?.errorMessage, '');
            }
          }, 600);
          // CourseActivityArchiveProd
          setTimeout(function () {
            console.log('CourseActivityArchiveProd - err: ', res.CourseActivityArchiveProd?.errorMessage);
            if (res.CourseActivityArchiveProd?.status === 200) {
              Utils.showToast('success', 2500, `${res.CourseActivityArchiveProd.body} table was synced successfully.`, '');
            } else if(res.CourseActivityArchiveProd?.errorMessage.includes("Task timed out")) {
              Utils.showToast('warning', 3000, `CourseActivityArchiveProd - Task timed out.`, '');
            } else {
              Utils.showToast('warning', 3000, res.CourseActivityArchiveProd?.errorMessage, '');
            }
          }, 900);
        } else {
          Utils.showToast('warning', 3000, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 3000, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  const syncPinCoordinatesProdTablesOfClub = (club_id) => {
    Utils.showSpinner();
    VccFactory.syncPinCoordinatesProdTablesOfClub({club_id: club_id})
      .then((res) => {
        if (res.status === 200) {
          console.log('PCP err: ', res.PinCoordinatesProd?.errorMessage);
          if (res.PinCoordinatesProd?.status === 200) {
            Utils.showToast('success', 2500, `${res.PinCoordinatesProd.body} table was synced successfully.`, '');
          } else if(res.PinCoordinatesProd?.errorMessage && res.PinCoordinatesProd?.errorMessage.includes("Task timed out")) {
            Utils.showToast('warning', 3000, "Task timed out.", '');
          } else {
            Utils.showToast('warning', 3000, res.PinCoordinatesProd?.errorMessage, '');
          }
        } else {
          Utils.showToast('warning', 3000, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 3000, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  return (
    <div className="courses">
      {/*  */}
      <PageHeader title="Golf Clubs" />
      <div className="d-flex justify-content-around">
        <li className="p-1"><small>PinCoordinatesProd:</small> PCP</li>
        <li className="p-1"><small>PinRotationsProd:</small> PRP</li>
        <li className="p-1"><small>CourseActivityProd:</small> CAP</li>
        <li className="p-1"><small>CourseActivityArchiveProd:</small> CAAP</li>
      </div>
      <div className="card">
        <div className="card-body pb-0">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th className="th-orderby">club id<TableOrderBy searchParam={searchParam} column="site_id" handleOrderBy={handleOrderBy} /></th>
                <th className="th-orderby">club name<TableOrderBy searchParam={searchParam} column="site_name" handleOrderBy={handleOrderBy} /></th>
                <th className="th-orderby">course id<TableOrderBy searchParam={searchParam} column="course_id" handleOrderBy={handleOrderBy} /></th>
                <th className="th-orderby">course name<TableOrderBy searchParam={searchParam} column="course_name" handleOrderBy={handleOrderBy} /></th>
                <th className="th-orderby">domain<TableOrderBy searchParam={searchParam} column="domain_type" handleOrderBy={handleOrderBy} /></th>
                <th>username</th>
                <th>password</th>
                <th>action</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <select className="form-control"
                    onChange={(e) => setCredential({...credential, domain_type: e.target.value})}
                    value={credential.domain_type}
                  >
                    <option value="visagenet">vcc.visagenet.com</option>
                    <option value="visagegolf">vcc.visage.golf</option>
                  </select>
                </th>
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
                  <td>{item.domain_type}</td>
                  <td>{item.club.username}</td>
                  <td>{item.club.password}</td>
                  <td>
                    <div className="d-flex">
                      <button className="btn btn-primary mr-2"
                        onClick={() => syncClubTables(item.club_id)}
                      >Sync All</button>
                      <button className="btn btn-primary mr-2"
                        onClick={() => syncPinCoordinatesProdTablesOfClub(item.club_id)}
                      >Sync PCP</button>
                      <button className="btn btn-danger"
                        onClick={() => removeClub(item.club_id)}
                      >Remove</button>
                    </div>
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

export default GolfClubs;
