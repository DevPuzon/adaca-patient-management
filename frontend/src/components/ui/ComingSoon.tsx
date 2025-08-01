import React from 'react';

const ComingSoonComponent = ({
  feature = 'This page',
}: {
  feature?: string;
}) => {
  return (
    <div className="text-center mt-20 text-gray-600">
      <h1 className="text-3xl font-bold mb-4">{feature} is coming soon!</h1>
      <p className="text-sm">
        We're still working on this section. Please check back later.
      </p>
    </div>
  );
};

const ComingSoon = React.memo(ComingSoonComponent);
ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;
