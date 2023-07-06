import './index.css'

const SkillsCard = props => {
  const {details} = props
  const {imageUrl, name} = details

  return (
    <li key={name} className="skill-item">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillsCard
