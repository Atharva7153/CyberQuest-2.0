const formatTimestamp = () => new Date().toISOString();

export const logger = {
  info: (moduleName, message, meta = '') => {
    console.log(`[${formatTimestamp()}] [NEXUS::${moduleName}] [INFO] ${message}`, meta);
  },
  warn: (moduleName, message, meta = '') => {
    console.warn(`[${formatTimestamp()}] [NEXUS::${moduleName}] [WARN] ${message}`, meta);
  },
  error: (moduleName, message, meta = '') => {
    console.error(`[${formatTimestamp()}] [NEXUS::${moduleName}] [ERROR] ${message}`, meta);
  },
};
