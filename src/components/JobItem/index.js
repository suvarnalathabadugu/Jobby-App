import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details
  return (
    <Link to={`/jobs/${id}`} className="job-item-link">
      <li className="job-item-container">
        <div className="top-section">
          <div className="inner">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="inner-section">
              <h1 className="job-title">{title}</h1>
              <div className="rating-section">
                <AiFillStar className="star-icon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="top-down">
            <div className="top-left">
              <div className="icon-section">
                <MdLocationOn className="location-icon" />
                <p>{location}</p>
              </div>
              <div className="icon-section">
                <BsFillBriefcaseFill className="briefcase-icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="bottom-section">
          <h1 className="desc-head">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
