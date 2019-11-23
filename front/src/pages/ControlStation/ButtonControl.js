import React, { Component } from 'react';

class ButtonControl extends Component {
  constructor(props) {
    super(props);
    
  }
  
    render() {
        return (
            <div>
            <div>
            <div className="row mt-2 mb-2">
                <div className="col-4 m-rocker d-flex justify-content-around">
                <img className="card-img-top" src="https://image.flaticon.com/icons/svg/66/66298.svg" alt="Card image cap"  />
                </div>
                <div className="col-4 m-rocker d-flex justify-content-around text-center">
                <img className="card-img-top" src="https://image.flaticon.com/icons/svg/1404/1404885.svg" alt="Card image cap"  />
                </div>
                <div className="col-4 m-rocker d-flex justify-content-around">
                <img className="card-img-top" src="https://image.flaticon.com/icons/svg/1179/1179774.svg" alt="Card image cap"  />
                </div>
              </div>
              <div className="row mt-2 mb-2">
                <div className="col-4 m-rocker d-flex justify-content-around">Light</div>
                <div className="col-4 m-rocker d-flex justify-content-around text-center">Water Pump</div>
                <div className="col-4 m-rocker d-flex justify-content-around">Fan</div>
              </div>
            </div>
            <div className="buttonRGB row">
              <div className="col-4 m-rocker d-flex justify-content-around pl-5">
                <input id="R" type="checkbox" onclick="handleClickButtonControl(this.id);
                  " /><label htmlFor="R" style={{borderColor: '#A9A9A9'}}>Switch</label>
              </div>
              <div className="col-4 m-rocker d-flex justify-content-around pl-5">
                <input id="G" type="checkbox" onclick="handleClickButtonControl(this.id)" /><label htmlFor="G" style={{borderColor: '#A9A9A9'}}>Switch</label>
              </div>
              <div className="col-4 m-rocker d-flex justify-content-around pl-5">
                <input id="B" type="checkbox" onclick="handleClickButtonControl(this.id)" /><label htmlFor="B" style={{borderColor: '#A9A9A9'}}>Switch</label>
              </div>
            </div>
            
        </div>
        
  
        );
    }
}

export default ButtonControl;