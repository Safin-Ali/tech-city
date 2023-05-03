import { useContext } from 'react';
import { ExtraDataContext } from '../../../Context/Extra-Data';
import ServiceCard from '../../../Components/Card/Service-Card';
import SectionHeader from '../../../Components/Utilities/Section-Header';
import ServiceCardSkeleton from '../../../Components/Card/ServiceCardSkeleton';
import newArr from '../../../Services/Utils/create-new-arr';
import EmptyData from '../../../Components/Error/EmptyData';

function ServiceSection() {

    const { servicesInfo, servicesInfoLoading } = useContext(ExtraDataContext);

    return (
        <section className={ `service-section` }>

            <SectionHeader>Our Services</SectionHeader>

            <div className={ `service-section-box` }>
                {

                    servicesInfoLoading ?
                        newArr(4).map(i => <ServiceCardSkeleton key={ i } />)
                        :
                        servicesInfo?.length
                            ?
                            servicesInfo?.map(service => <ServiceCard
                                servDesc={ service.desc }
                                servImg={ service.serviceIcon }
                                servName={ service.name }
                                key={ service._id }
                            />)

                            : <div><EmptyData/></div>
                }
            </div>
        </section>
    );
};
export default ServiceSection;