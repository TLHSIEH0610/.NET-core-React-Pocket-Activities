
using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        //entities configuration
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //config the join table ActivityAttendee
            builder.Entity<ActivityAttendee>(x => x.HasKey(a => new { a.AppUserId, a.ActivityId }));

            builder.Entity<ActivityAttendee>().HasOne(a => a.AppUser).WithMany(a => a.Activities).HasForeignKey(a => a.AppUserId);

            builder.Entity<ActivityAttendee>().HasOne(a => a.Activity).WithMany(a => a.Attendees).HasForeignKey(a => a.ActivityId);

            //user - comments => cascade
            builder.Entity<Comment>().HasOne(a => a.Activity).WithMany(a => a.Comments).OnDelete(DeleteBehavior.Cascade);

            //follower/following
            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });
                b.HasOne(o => o.Observer).WithMany(f => f.Followings).HasForeignKey(o => o.ObserverId).OnDelete(DeleteBehavior.Cascade);
                b.HasOne(o => o.Target).WithMany(f => f.Followers).HasForeignKey(o => o.TargetId).OnDelete(DeleteBehavior.Cascade);
            });

        }
    }
}