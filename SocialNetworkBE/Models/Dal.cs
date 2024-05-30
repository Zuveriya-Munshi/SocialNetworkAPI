using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
namespace SocialNetworkBE.Models
{
    public class Dal
    {
        public Response Registration(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into Registration(Name,Email,Password,PhoneNo,IsActive,IsApproved,UserType) values('" + registration.Name + "','" + registration.Email + "','" + registration.Password + "','" + registration.PhoneNo + "',1,0, 'USER')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Registration Successful";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Registration Failed";
            }
            connection.Close();

            return response;
        }

        public Response Login(Registration registration, SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration Where Email = '" + registration.Email + "' AND Password = '" + registration.Password + "'", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();
            if (dt.Rows.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Login Successful";
                Registration reg = new Registration();
                reg.Id = Convert.ToInt32(dt.Rows[0]["ID"]);
                reg.Name = Convert.ToString(dt.Rows[0]["Name"]);
                reg.Email = Convert.ToString(dt.Rows[0]["Email"]);
                response.Registration = reg;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Login Failed";
                response.Registration = null;
            }
            return response;
        }
        public Response RegistrationList(SqlConnection connection)
        {
            Response response = new Response();

            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration Where IsActive = 1 AND UserType = 'USER' ", connection);

            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Registration> lstRegistration = new List<Registration>();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Registration reg = new Registration();
                    reg.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    reg.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    reg.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    reg.Password = Convert.ToString(dt.Rows[i]["Password"]);
                    reg.PhoneNo = Convert.ToString(dt.Rows[i]["PhoneNo"]);

                    reg.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    reg.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    reg.UserType = Convert.ToString(dt.Rows[i]["UserType"]);
                    lstRegistration.Add(reg);

                }
                if (lstRegistration.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Registration Data found";

                    response.listRegistration = lstRegistration;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No Registration Data found";
                    response.listEvents = null;

                }


            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Event Data found";
                response.listEvents = null;
            }
            return response;
        }

        public Response UserApproval(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Registration SET IsApproved=1 WHERE ID = '" + registration.Id + "' AND IsActive=1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Approved";

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Approval failed";
            }
            connection.Close();

            return response;
        }

        public Response AddNews(News news, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into News(Title,Content,Email,IsActive,CreatedOn) values('" + news.Title + "','" + news.Content + "','" + news.Email + "',1,GETDATE())", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "News Created";

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "News Creation failed";
            }
            connection.Close();

            return response;
        }

        public Response NewsList(SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM News Where IsActive = 1", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();
            List<News> lstNews = new List<News>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    News news = new News();
                    news.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    news.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    news.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    news.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    news.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    news.CreatedOn = Convert.ToString(dt.Rows[i]["CreatedOn"]);
                    lstNews.Add(news);

                }
                if (lstNews.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "News Data found";

                    response.listNews = lstNews;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No News Data found";
                    response.listNews = null;

                }


            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No News Data found";
                response.listNews = null;
            }
            return response;
        }

        public Response AddArticle(Article article, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into Article(Title,Content,Email,Image,IsActive,IsApproved) values('" + article.Title + "','" + article.Content + "','" + article.Email + "','" + article.Image + "',1,0)", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Article Created";

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Article Creation failed";
            }
            connection.Close();

            return response;
        }

        public Response ArticleList(Article article, SqlConnection connection)
        {
            SqlDataAdapter da = null;
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();
            if (article.type == "User")
            {
                new SqlDataAdapter("SELECT * FROM Article Where Email = '" + article.Email + "' IsActive = 1'", connection);
            }
            if (article.type == "Page")
            {
                new SqlDataAdapter("SELECT * FROM Article Where IsActive = 1'", connection);
            }
            List<Article> lstArticle = new List<Article>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Article articles = new Article();
                    articles.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    articles.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    articles.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    articles.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    articles.Image = Convert.ToString(dt.Rows[i]["Image"]);

                    articles.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    articles.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    lstArticle.Add(articles);

                }
                if (lstArticle.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Article Data found";

                    response.listArticle = lstArticle;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No Article Data found";
                    response.listArticle = null;

                }


            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Article Data found";
                response.listArticle = null;
            }
            return response;
        }

        public Response ArticleApproval(Article article, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("UPDATE Article SET IsApproved=1 WHERE ID = '" + article.Id + "' AND IsActive=1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Article Approved";

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Article Approval failed";
            }
            connection.Close();

            return response;
        }

        public Response StaffRegistration(Staff staff, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into Staff(Name,Email,Password,IsActive) values('" + staff.Name + "','" + staff.Email + "','" + staff.Password + "',1)", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Staff Registration Successful";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Staff Registration Failed";
            }
            connection.Close();

            return response;
        }

        public Response DeleteStaff(Staff staff, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("DELETE from Staff where ID = '" + staff.Id + "' AND IsActive =1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Staff Deleted Successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Staff Deletion Failed";
            }
            connection.Close();

            return response;
        }

        public Response AddEvent(Events events, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into Events(Title,Content,Email,IsActive,CreatedOn) values('" + events.Title + "','" + events.Content + "','" + events.Email + "',1, GETDATE())", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Events Created";

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Events Creation failed";
            }
            connection.Close();

            return response;
        }

        public Response EventList(SqlConnection connection)
        {
            Response response = new Response();

            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Events Where IsActive = 1'", connection);

            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Events> lstEvents = new List<Events>();



            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Events events = new Events();
                    events.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    events.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    events.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    events.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    events.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    events.CreatedOn = Convert.ToString(dt.Rows[i]["CreatedOn"]);
                    lstEvents.Add(events);

                }
                if (lstEvents.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Event Data found";

                    response.listEvents = lstEvents;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No Event Data found";
                    response.listEvents = null;

                }


            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Event Data found";
                response.listEvents = null;
            }
            return response;
        }

    }
}
