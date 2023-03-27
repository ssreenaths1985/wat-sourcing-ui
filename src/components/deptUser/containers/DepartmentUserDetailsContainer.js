import DepartmentDetailsView from '../views/DepartmentDetailsView';

const DepartmentUserDetailsContainer = (props) => {

    return(
        <div className="container-flud">
            <DepartmentDetailsView departmentName={props.match.params.name}/>
        </div>
    )
};

export default DepartmentUserDetailsContainer;