import React from 'react';

class CreditCard extends React.Component {
    render() {
        return (
            <div>
                <div className="form-horizontal col-xs-12">
        			<div className="col-xs-12 col-sm-3 col-md-3 col-lg-2">
        				<label className="col-sm-12 control-label" htmlFor="creditCard">Credit Card</label>
        			</div>
        
        			<div className="col-xs-6 col-sm-4 col-md-6 col-lg-6">
        				<div className="input-group input-group-sm tooltip-demo">
        					<input type="text" className="form-control" size="50" value="4242424242424242" id="creditCard" maxLength="32" data-stripe="number"/>
        				</div>
        				<div className="help-block">Credit Card Number</div>
        			</div>
        		</div>
        		<div className="form-horizontal form-group col-xs-3 col-sm-12">
        			<div className="col-xs-12 col-sm-3 col-md-3 col-lg-2">
        				<label className="col-sm-12 control-label" htmlFor="month">Month</label>
        			</div>
        			<div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
        				<div className="input-group input-group-sm tooltip-demo">
        					<select className="select2" data-stripe="exp-month">
        						<option>01</option>
        						<option>02</option>
        						<option>03</option>
        						<option>04</option>
        						<option>05</option>
        						<option>06</option>
        						<option>07</option>
        						<option>08</option>
        						<option>09</option>
        						<option>10</option>
        						<option>11</option>
        						<option value="12" selected="true">12</option>
        					</select>
        				</div>
        				<div className="help-block">MM</div>
        			</div>
        		</div>
        		<div className="form-horizontal form-group col-xs-3 col-sm-12">
        			<div className="col-xs-12 col-sm-3 col-md-3 col-lg-2">
        				<label className="col-sm-12 control-label">Year</label>
        			</div>
        			<div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
        				<div className="input-group input-group-sm">
        					<select className="" data-stripe="exp-year" value="2015">
        							<option>2015</option>
        							<option>2016</option>
        							<option>2017</option>
        							<option>2018</option>
        							<option>2019</option>
        							<option>2020</option>
        							<option>2021</option>
        					</select>
        				</div>
        				<div className="help-block">YY</div>
        			</div>
        	    </div>
        		<div className="form-horizontal form-group col-xs-12">
        			<div className="col-xs-12 col-sm-3 col-md-3 col-lg-2">
        				<label className="col-sm-12 control-label" htmlFor="cvv">CVV</label>
        			</div>
        			<div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
        				<div className="input-group input-group-sm tooltip-demo">
        					<input type="text" className="form-control" size="3" value="789" id="txtCVV" data-stripe="cvc"/>
        				</div>
        				<div className="help-block">CVV</div>
        			</div>
        		</div>  
        	</div>
        );
    }
}

export default CreditCard;