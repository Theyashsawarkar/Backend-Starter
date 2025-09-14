
const defaultEntity = "Records"

export const Message = {
  Success: {
    SENT: (entity = defaultEntity) => `${entity} Sent Successfully`,
    CREATED: (entity = defaultEntity) => `${entity} Created Successfully`,
    ADDED: (entity = defaultEntity) => `${entity} Added Successfully`,
    UPDATED: (entity = defaultEntity) => `${entity} Updated Successfully`,
    FETCHED: (entity = defaultEntity) => `${entity} Fetched Successfully`,
    DELETED: (entity = defaultEntity) => `${entity} Deleted Successfully`,
    VERIFIED: (entity = defaultEntity) => `${entity} Verified Successfully`,
    UPLOADED: (entity = defaultEntity) => `${entity} Uploaded Successfully`,
    LOGGEDIN: (entity) => `${entity} Logged In Successfully`,
  },

  Error: {
    FAILED: (entity = "Operation") => `${entity} Failed`,
    EXPIRED: (entity = defaultEntity) => `${entity} Is Expired`,
    BLOCKED: (entity = defaultEntity) => `${entity} Is Blocked`,
    NOT_FOUND: (entity = defaultEntity) => `${entity} Not Found`,
    INACTIVE: (entity = defaultEntity) => `${entity} Is Inactive`,
    UNAUTHORIZED: () => "Unauthorized Action",
    SERVER_ERROR: () => "Internal Server Error",
    ALREADY_EXISTS: (entity = defaultEntity) => `${entity} Already Exists`,
    LIMIT_EXCEEDED: (entity = defaultEntity) => `${entity} Limit Exceeded`,
    ALREADY_VERIFIED: (entity = defaultEntity) => `${entity} Already Verified`,
    ALREADY_PROCESSED: (entity = defaultEntity) => `${entity} Already Processed`,
    INVALID: (entity = "Credentials") => `Invalid ${entity}`,
  },
}
