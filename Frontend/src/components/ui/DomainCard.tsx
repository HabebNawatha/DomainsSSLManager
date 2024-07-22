import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../ui/DomainCard.css';
import { CertificationData } from '../../models/CertificationData';

const DomainCard: React.FC<CertificationData> = ({ domain, certificateDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const parsedValidTo = new Date(certificateDetails.validTo);
    const updateInterval = setInterval(() => {
      const now = new Date();
      const diffInMs = parsedValidTo.getTime() - now.getTime();

      if (diffInMs <= 0) {
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(updateInterval);
        return;
      }

      const remainingDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      const remainingSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

      setRemainingTime({ days: remainingDays, hours: remainingHours, minutes: remainingMinutes, seconds: remainingSeconds });
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [certificateDetails.validTo]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const cardStatusClass = new Date(certificateDetails.validTo) < new Date()
    ? 'expired'
    : new Date(certificateDetails.validTo) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      ? 'expiring'
      : 'valid';

  const getExpiresTypographyClassName = () => {
    switch (cardStatusClass) {
      case 'valid':
        return 'valid-expires-typography';
      case 'expiring':
        return 'expiring-expires-typography';
      case 'expired':
        return 'expired-expires-typography';
      default:
        return 'typography';
    }
  };

  return (
    <Card className={`domain-card ${cardStatusClass} ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
      <CardHeader 
        title={domain}
        className="custom-card-header"
        action={
          <IconButton onClick={handleExpand}>
            <InfoOutlinedIcon color={isExpanded ? 'primary' : 'inherit'} />
          </IconButton>
        }
      />
      <CardContent className="card-content">
        {isExpanded ? (
          <>
            <Typography variant="body1">Issuer: {certificateDetails.issuer.O}</Typography>
            <Typography variant="body1">Valid From: {new Date(certificateDetails.validFrom).toLocaleDateString()}</Typography>
            <Typography variant="body1">Valid To: {new Date(certificateDetails.validTo).toLocaleDateString()}</Typography>
            <Typography variant="body1">Serial Number: {certificateDetails.serialNumber}</Typography>
            <Typography variant="body1">Fingerprint: {certificateDetails.fingerprint}</Typography>
            <Typography variant="body1" className={getExpiresTypographyClassName()}>
              Expires in: {remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes, {remainingTime.seconds} seconds
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body1">Issuer: {certificateDetails.issuer.O}</Typography>
            <Tooltip title={new Date(certificateDetails.validFrom).toLocaleDateString()}>
              <Typography variant="body1">Valid From: {new Date(certificateDetails.validFrom).toLocaleDateString().slice(0, 10)}</Typography>
            </Tooltip>
            <Tooltip title={new Date(certificateDetails.validTo).toLocaleDateString()}>
              <Typography variant="body1">Valid To: {new Date(certificateDetails.validTo).toLocaleDateString().slice(0, 10)}</Typography>
            </Tooltip>
            <Typography variant="body1" className={getExpiresTypographyClassName()}>
              Expires in: {remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes, {remainingTime.seconds} seconds
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DomainCard;
