import {logger} from 'react-native-logs';

var log = logger.createLogger();

log.debug('This is a Debug log');
log.info('This is an Info log');
log.warn('This is a Warning log');
log.error('This is an Error log');

export {log};
