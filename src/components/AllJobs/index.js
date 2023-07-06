import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import './index.css'

import FiltersGroup from '../FiltersGroup'
import JobItem from '../JobItem'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobs extends Component {
  state = {
    jobsList: [],
    employmentType: [],
    minimumPackage: 0,
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {employmentType, minimumPackage, searchInput} = this.state
    const updatedEmploymentType = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')

    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${updatedEmploymentType}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(jobsUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onEmployment = type => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, type],
      }),
      this.getProducts,
    )
  }

  onPackage = minimumPackage => {
    this.setState({minimumPackage}, this.getProducts)
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getProducts()
    }
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBtn = () => {
    this.getProducts()
  }

  onRetryBtn = () => {
    this.getProducts()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-btn" onClick={this.onRetryBtn}>
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobsList, searchInput} = this.state
    const jobsDisplay = jobsList.length > 1

    return jobsDisplay ? (
      <>
        <div className="lg-search-con">
          <input
            type="search"
            value={searchInput}
            placeholder="Search"
            className="search-input"
            onChange={this.onSearch}
          />
          <button
            type="button"
            className="search-btn"
            onClick={this.onSearchBtn}
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="job-item-card">
          {jobsList.map(eachItem => (
            <JobItem details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    ) : (
      <>
        <div className="lg-search-con">
          <input
            type="search"
            value={searchInput}
            placeholder="Search"
            className="search-input"
            onChange={this.onSearch}
          />
          <button
            type="button"
            className="search-btn"
            onClick={this.onSearchBtn}
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="no-products-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-job-head">No Jobs Found</h1>
          <p className="no-job-desc">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      </>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderJobDetails()
      case 'INPROGRESS':
        return this.renderLoader()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />

        <div className="all-jobs-container">
          <div className="sm-search-con">
            <input
              type="search"
              value={searchInput}
              placeholder="Search"
              className="search-input"
              onChange={this.onSearch}
            />
            <button
              type="button"
              className="search-btn"
              onClick={this.onSearchBtn}
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="lg-left">
            <div className="lg-left-section">
              <FiltersGroup
                onEmployment={this.onEmployment}
                onPackage={this.onPackage}
                onSearch={this.onSearch}
                onKeyDown={this.onKeyDown}
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                searchInput={searchInput}
              />
            </div>
          </div>

          <div className="lg-right">{this.renderViews()}</div>
        </div>
      </>
    )
  }
}

export default AllJobs
