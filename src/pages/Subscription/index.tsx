import React from 'react';
import { PageWrapper } from '../../components/StyledComponets';
import HowItWorks from './HowItWorks';
import SubscriptionForm from './SubscriptionFrom';

const Subscription: React.FC = () => {
  return (
    <PageWrapper>
      <HowItWorks />
      <SubscriptionForm />
    </PageWrapper>
  )
}

export default Subscription;