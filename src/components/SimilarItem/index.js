import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <li className="s-job-item-container">
      <div className="s-top-section">
        <div className="inner">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="inner-section">
            <h1 className="job-title">{title}</h1>
            <div className="rating-section">
              <AiFillStar className="s-star-icon" />
              <p className="s-rating">{rating}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <h1 className="s-desc-head">Description</h1>
        <p className="s-desc">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarItem
