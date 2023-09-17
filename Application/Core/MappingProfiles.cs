using AutoMapper;
using Domain;
using API.DTOs;
using Application.Activities;
using Application.Comments;
namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            //map Activity, ActivityDto
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(d => d.AppUserId, o => o.MapFrom(s => s.Id));

            CreateMap<Comment, CommentDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.Email, o => o.MapFrom(s => s.Author.Email))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Email));

        }
    }
}