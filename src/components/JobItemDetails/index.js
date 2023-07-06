import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarItem from '../SimilarItem'
import SkillsCard from '../SkillsCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobsList: {},
    similarItemsList: [],
    lifeAtList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jobsUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(jobsUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }

      const {jobDetails, similarJobs} = updatedData

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: jobDetails.title,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }

      const {lifeAtCompany} = updatedJobDetails

      const updatedLife = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      const updatedSimilarJobs = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobsList: updatedJobDetails,
        similarItemsList: updatedSimilarJobs,
        lifeAtList: updatedLife,
        apiStatus: apiStatusConstants.success,
      })

      console.log(updatedJobDetails.skills)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetryBtn = () => {
    this.getJobItemDetails()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsList, similarItemsList, lifeAtList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      title,
      location,
      rating,
      skills,
      packagePerAnnum,
    } = jobsList

    const {description, imageUrl} = lifeAtList

    return (
      <>
        <div className="job-details-section">
          <div>
            <div className="top-sec">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div>
                <h1 className="job-title">{title}</h1>
                <div className="inner-top">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="inner-bottom">
              <div className="bottom">
                <div className="bottom">
                  <MdLocationOn className="location-icon" />
                  <p>{location}</p>
                </div>
                <div className="bottom">
                  <BsFillBriefcaseFill className="briefcase-icon" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <div>
                <p>{packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="description-section">
            <div className="link-section">
              <h1 className="link-head">Description</h1>
              <a href={companyWebsiteUrl} className="visit-link">
                <div className="visit-link-con">
                  <p className="visit-head">Visit</p>
                  <FiExternalLink />
                </div>
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          <h1 className="skills-head">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachItem => (
              <SkillsCard key={eachItem.id} details={eachItem} />
            ))}
          </ul>
          <h1 className="skills-head">Life at Company</h1>
          <div className="life-con">
            <p className="job-description">{description}</p>
            <img src={imageUrl} alt="life at company" className="life-img" />
          </div>
        </div>
        <h1 className="similar-head">Similar Jobs</h1>
        <ul className="similar-items-container">
          {similarItemsList.map(eachItem => (
            <SimilarItem key={eachItem.id} details={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
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

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'INPROGRESS':
        return this.renderLoader()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">{this.renderViews()}</div>
      </>
    )
  }
}

export default JobItemDetails
