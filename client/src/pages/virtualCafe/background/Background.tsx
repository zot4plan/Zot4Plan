interface BackgroundProps {
    background: {
        path: string,
        description: string
    }
}
const Background = ({background}: BackgroundProps) => {
    return (
        <img 
            className='background-images' 
            src={background.path} 
            alt={background.description}
        />
    )
  }
  
  export default Background