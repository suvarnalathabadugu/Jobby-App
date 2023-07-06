import Profile from '../Profile'
import './index.css'

const FiltersGroup = props => {
  const getEmploymentTypeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachItem => {
      const {onEmployment} = props
      const onEmploymentType = event => onEmployment(event.target.value)

      return (
        <li key={eachItem.employmentTypeId} className="check-item">
          <input
            type="checkbox"
            value={eachItem.employmentTypeId}
            onChange={onEmploymentType}
            className="check-input"
            id={eachItem.employmentTypeId}
          />
          <label className="employ-label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      )
    })
  }

  const getSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachItem => {
      const {onPackage} = props
      const onPackageRange = event => onPackage(event.target.value)

      return (
        <li key={eachItem.salaryRangeId} className="radio-item">
          <input
            type="radio"
            value={eachItem.salaryRangeId}
            name="salary"
            onChange={onPackageRange}
            className="radio-input"
            id={eachItem.salaryRangeId}
          />
          <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
        </li>
      )
    })
  }

  return (
    <>
      <Profile />
      <div className="filter-container">
        <hr className="h-line" />
        <h1 className="type">Type of Employment</h1>
        <ul className="input-types">{getEmploymentTypeList()}</ul>
        <hr className="h-line" />
        <h1 className="type">Salary Range</h1>
        <ul className="input-ranges">{getSalaryRangeList()}</ul>
      </div>
    </>
  )
}

export default FiltersGroup
