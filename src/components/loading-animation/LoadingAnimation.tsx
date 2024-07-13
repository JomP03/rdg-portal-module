import loadingGif from '../../assets/loading.gif';
import './loading-animation.css'

export const LoadingAnimation = () => {
    return (
        <div className={ 'loadingContainer' }>

            <img src={loadingGif} className={ 'loader' } alt='Loading' />

        </div>
    );
}

export default LoadingAnimation;
