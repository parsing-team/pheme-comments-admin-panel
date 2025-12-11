
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Future_sourcesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  count_followers: 'count_followers',
  is_ready: 'is_ready',
  profiles_id: 'profiles_id'
};

exports.Prisma.Rss_newsScalarFieldEnum = {
  id: 'id',
  link: 'link',
  publish_date: 'publish_date',
  date: 'date'
};

exports.Prisma.Twitter_action_statsScalarFieldEnum = {
  id: 'id',
  likes: 'likes',
  views: 'views',
  comments: 'comments',
  reposts: 'reposts',
  saveds: 'saveds',
  post_id: 'post_id',
  permalink: 'permalink',
  source_id: 'source_id',
  rev: 'rev',
  date: 'date'
};

exports.Prisma.Twitter_postsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  plain_content: 'plain_content',
  image_data: 'image_data',
  publish_date: 'publish_date',
  lang: 'lang',
  lang_proba: 'lang_proba',
  date: 'date',
  source_id: 'source_id',
  permalink: 'permalink',
  mlready: 'mlready'
};

exports.Prisma.Twitter_profilesScalarFieldEnum = {
  id: 'id',
  type: 'type',
  name: 'name',
  profiles_id: 'profiles_id',
  active: 'active',
  updated: 'updated'
};

exports.Prisma.Twitter_profiles_statsScalarFieldEnum = {
  id: 'id',
  twitter_profilesid: 'twitter_profilesid',
  date: 'date',
  subscription: 'subscription'
};

exports.Prisma.Twitter_profiles_tempScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.Twitter_profiles_twitter_postsScalarFieldEnum = {
  id: 'id',
  post_id: 'post_id',
  likes: 'likes',
  views: 'views',
  reposts: 'reposts',
  comments: 'comments',
  saveds: 'saveds',
  twitter_profilesid: 'twitter_profilesid',
  twitter_postid: 'twitter_postid',
  isvideo: 'isvideo',
  is_repost: 'is_repost',
  source_link: 'source_link'
};

exports.Prisma.Twitter_relation_replyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  post_type: 'post_type',
  plain_context: 'plain_context',
  replies: 'replies',
  reposts: 'reposts',
  likes: 'likes',
  bookmarks: 'bookmarks',
  views: 'views',
  publish_date: 'publish_date',
  post_id: 'post_id',
  source_id: 'source_id',
  reposted_profile: 'reposted_profile',
  root_post: 'root_post'
};

exports.Prisma.Twitter_relationships_reply_profilesScalarFieldEnum = {
  id: 'id',
  profile_id: 'profile_id',
  name: 'name',
  username: 'username',
  followers_count: 'followers_count',
  following_count: 'following_count',
  location: 'location',
  birthdate: 'birthdate',
  description: 'description',
  joined: 'joined',
  url: 'url',
  category: 'category'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  future_sources: 'future_sources',
  rss_news: 'rss_news',
  twitter_action_stats: 'twitter_action_stats',
  twitter_posts: 'twitter_posts',
  twitter_profiles: 'twitter_profiles',
  twitter_profiles_stats: 'twitter_profiles_stats',
  twitter_profiles_temp: 'twitter_profiles_temp',
  twitter_profiles_twitter_posts: 'twitter_profiles_twitter_posts',
  twitter_relation_reply: 'twitter_relation_reply',
  twitter_relationships_reply_profiles: 'twitter_relationships_reply_profiles'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
