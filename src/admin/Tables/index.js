import React from 'react';
import PageHeader from '../components/PageHeader';
import { VccFactory } from '../../factory';
import Utils from '../../factory/Utils';

function Tables() {

  const resetTable = (table) => {
    Utils.showSpinner();
    VccFactory.resetTable({table})
      .then((res) => {
        if (res.status === 200) {
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
    <div className="tables">
      {/*  */}
      <PageHeader title="AccuPin Tables" />
      <div className="card">
        <div className="card-body">
          <div className="row border-row">
            <div className="col-4 py-2">CourseActivityArchiveProd</div>
            <div className="col-4">
              <button className="btn btn-primary" onClick={() => resetTable("CourseActivityArchiveProd")}>Reset</button>
            </div>
          </div>
          <div className="row border-row">
            <div className="col-4 py-2">CourseActivityProd</div>
            <div className="col-4">
              <button className="btn btn-primary" onClick={() => resetTable("CourseActivityProd")}>Reset</button>
            </div>
          </div>
          <div className="row border-row">
            <div className="col-4 py-2">PinRotationsProd</div>
            <div className="col-4">
              <button className="btn btn-primary" onClick={() => resetTable("PinRotationsProd")}>Reset</button>
            </div>
          </div>
          <div className="row border-row">
            <div className="col-4 py-2">PinCoordinatesProd</div>
            <div className="col-4">
              <button className="btn btn-primary" onClick={() => resetTable("PinCoordinatesProd")}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default Tables;
