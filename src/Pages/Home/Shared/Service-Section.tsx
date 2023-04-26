import { useContext } from 'react';
import { ExtraDataContext } from '../../../Context/Extra-Data';
import ServiceCard from '../../../Components/Card/Service-Card';
import SectionHeader from '../../../Components/Utilities/Section-Header';

function ServiceSection() {

    const { servicesInfo, servicesInfoLoading } = useContext(ExtraDataContext);

    if (servicesInfoLoading) return <div>Loading</div>;

    console.log(servicesInfo);


    return (
        <section className={ `service-section` }>

            <SectionHeader>Our Services</SectionHeader>

            <div className={`service-section-box`}>
                {
                    servicesInfo?.length ?
                        servicesInfo?.map(service => <ServiceCard
                            servDesc={ service.desc }
                            servImg={ service.serviceIcon }
                            servName={ service.name }
                            key={ service._id }
                        />)

                        : <div>not found</div>
                }
            </div>
        </section>
    );
};
export default ServiceSection;