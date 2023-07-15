const BLOG_STATE = {
  PUBLISHED: 1,
  DRAFT: 2,
};

const GRIEVIENCE_STATUS = {
  PENDING: 1,
  RESOLVED: 2,
  CLOSED: 3,
};

const ROLES = {
  SuperAdmin: 1,
  Farmer: 2,
  Department: 3,
  Officer: 4,
};

const USER_STATUS = {
  Pending: 1,
  Approved: 2,
  Rejected: 3,
  Deleted: 4,
};

module.exports = { BLOG_STATE, GRIEVIENCE_STATUS, ROLES, USER_STATUS };
