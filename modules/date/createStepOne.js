import React from 'react';
import H5 from 'core/H5'
import SubHeading from 'core/SubHeading'
import ClassSelection from 'core/ClassSelection'
import { Field, reduxForm } from 'redux-form'
import validate from 'modules/auth/forms/validate/validate'
import { FiArrowRight } from "react-icons/fi";
import { ImSpoonKnife } from "react-icons/im";
import { CustomIcon } from 'core/icon';
import { IoIosClose } from 'react-icons/io';
import useWindowSize from "utils/useWindowSize"; 
import { useSelector } from 'react-redux';

const CreateStepOne = props => {
    const { handleSubmit, previousPage, invalid, pristine, reset, submitting, onClose } = props
    const state = useSelector(state => state.form.CreateStepOne)
    const { width } = useWindowSize();
    return (
        <>
            <div className="inner_container">
                <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
                    <a onClick={previousPage}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> */}
                    </a>
                    <h6 className="m-0 text-white-50">Create a New Date</h6>
                    <IoIosClose size={32} onClick={onClose}/>
                </div>
                {width > 767 && (
                    <h3 className="text-center">Create a New Date</h3>
                )}
                <div className="step-wraps">
                    <ul>
                        <li className="active">
                            <span></span>
                        </li>
                        <li className="">
                            <span></span>
                        </li>
                        <li>
                            <span></span>
                        </li>
                        <li>
                            <span></span>
                        </li>
                    </ul>
                </div>  
            </div>    
            <div className="date-suggetion-text">
                <div className="inner_container" style={{paddingRight: '35px', paddingLeft: '35px'}}>
                    <h6>Date Suggestions</h6>
                    <p>Create a simple date or try your luck with something more upscale. Please select 2 options and keep in mind these are only suggestions </p>   
                </div>
            </div>
            <div className="date-class-section choose-gender">
                <form onSubmit={handleSubmit} style={{paddingRight: '10px', paddingLeft: '10px', paddingTop: '0px'}}>
                    <div className="inner_container">
                        <div className="mb-5">
                            <div className=" d-flex align-items-center justify-content-between">
                                <H5>Standard Class Dates</H5>
                                <span className="price-tag">$</span>
                            </div>
                            <SubHeading title="Higher response rate" />
                            <Field
                                name="search_type"
                                textColor={'#4F4E54'}
                                checkedColor={'white'}
                                options={[
                                    {
                                        label: 'Morning Beverage',
                                        id: 'MorningBeverage',
                                        iconName: 'CustomIcon.Sun',
                                        icon : <CustomIcon.Sun color={'#4F4E54'} size={30}/>,
                                        category: "standard_class_date"
                                    },
                                    {
                                        label: 'Outdoor Adventure',
                                        id: 'OutdoorAdventure',
                                        icon : <CustomIcon.OutdoorAdventure color={'#4F4E54'} size={30}/>,
                                        iconName: 'CustomIcon.OutdoorAdventure',
                                        category: "standard_class_date"
                                    },
                                    {
                                        label: 'Evening Date',
                                        id: 'EveningDate',
                                        icon : <CustomIcon.Moon color={'#4F4E54'} size={30}/>,
                                        iconName: 'CustomIcon.Moon',
                                        category: "standard_class_date"
                                    },
                                ]}
                                component={ClassSelection}
                            />
                        </div>
                        <div className="mb-5">
                            <div className=" d-flex align-items-center justify-content-between">
                                <H5>Middle Class Dates</H5>
                                <span className="price-tag">$$</span>
                            </div>
                            <SubHeading title="Average response rate" />
                            <Field
                                name="search_type"
                                textColor={'#4F4E54'}
                                checkedColor={'white'}
                                options={[
                                    {
                                        label: 'Take A Class',
                                        id: 'TakeClass',
                                        icon: <CustomIcon.TakeClass color={'#4F4E54'} size={30}/>,
                                        iconName: 'CustomIcon.TakeClass',
                                        category: "middle_class_date"
                                    },
                                    {
                                        label: 'Entertainment & sports ',
                                        id: 'Entertainmentsports',
                                        icon : <CustomIcon.EntertainmentSports color={'#4F4E54'} size={30}/>,
                                        iconName: 'CustomIcon.EntertainmentSports',
                                        category: "middle_class_date"
                                    },
                                    {
                                        label: 'Wine & Dine ',
                                        id: 'WineDine',
                                        icon : <CustomIcon.WineDine color={'#4F4E54'} size={30}/>,
                                        iconName: 'CustomIcon.WineDine',
                                        category: "middle_class_date"
                                    },
                                ]}
                                component={ClassSelection}
                            />
                        </div>
                        <div className="mb-5">
                            <div className=" d-flex align-items-center justify-content-between">
                                <H5>Executive Class Dates</H5>
                                <span className="price-tag">$$$</span>
                            </div>
                            <SubHeading title="Lower response rate" />
                            <Field
                                name="search_type"
                                textColor={'#4F4E54'}
                                checkedColor={'white'}
                                options={[
                                    {
                                        label: 'Casino & Drinks',
                                        id: 'CasinoDrinks',
                                        icon : <CustomIcon.CasinoDrinks color={'#4F4E54'} size={30}/>,
                                        iconName: 'CustomIcon.CasinoDrinks',
                                        category: "executive_class_date"
                                    },
                                    {
                                        label: 'Champaign & Caviar',
                                        id: 'ChampaignCaviar',
                                        icon : <CustomIcon.ChampaignCaviar color={'#4F4E54'} size={30}/>,
                                        iconName: 'CustomIcon.ChampaignCaviar',
                                        category: "executive_class_date"
                                    },
                                    {
                                        label: 'Bottles & Dance',
                                        id: 'BottlesDance',
                                        icon : <CustomIcon.BottlesDance color={'#4F4E54'} size={30}/>,
                                        iconName: 'CustomIcon.BottlesDance',
                                        category: "executive_class_date"
                                    },
                                ]}
                                component={ClassSelection}
                            />
                        </div>
                        <div className="bottom-mobile register-bottom" style={{ paddingTop: '0px' }}>
                            <div className="secret-input type-submit next-prev">
                                <button type="submit" className="next" disabled={!state.values?.search_type || invalid}>  
                                    Next <FiArrowRight />
                                </button>    
                            </div>
                        </div>
                    </div>
                </form>    
            </div>
        </>
    )
}
export default reduxForm({
    form: 'CreateStepOne',
    destroyOnUnmount: false,
    validate
  })(CreateStepOne);
