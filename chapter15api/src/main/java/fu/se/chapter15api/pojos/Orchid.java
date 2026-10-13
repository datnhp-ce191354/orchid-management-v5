package fu.se.chapter15api.pojos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "Orchid")
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrchidID")
    @JsonProperty("orchidId")
    private Integer orchidId;

    @Column(name = "OrchidName", nullable = false, length = 100)
    @JsonProperty("orchidName")
    private String orchidName;

    @Column(name = "IsNatural", nullable = false)
    @JsonProperty("isNatural")
    private boolean natural;

    @Column(name = "OrchidDescription", length = 500)
    @JsonProperty("orchidDescription")
    private String orchidDescription;

    @Column(name = "OrchidCategory", length = 100)
    @JsonProperty("orchidCategory")
    private String orchidCategory;

    @Column(name = "IsAttractive", nullable = false)
    @JsonProperty("isAttractive")
    private boolean attractive;

    @Column(name = "OrchidURL", length = 500)
    @JsonProperty("orchidURL")
    private String orchidURL;

    public Orchid() {}

    public Integer getOrchidId() { return orchidId; }
    public void setOrchidId(Integer orchidId) { this.orchidId = orchidId; }

    public String getOrchidName() { return orchidName; }
    public void setOrchidName(String orchidName) { this.orchidName = orchidName; }

    public boolean isNatural() { return natural; }
    public void setNatural(boolean natural) { this.natural = natural; }

    public String getOrchidDescription() { return orchidDescription; }
    public void setOrchidDescription(String orchidDescription) { this.orchidDescription = orchidDescription; }

    public String getOrchidCategory() { return orchidCategory; }
    public void setOrchidCategory(String orchidCategory) { this.orchidCategory = orchidCategory; }

    public boolean isAttractive() { return attractive; }
    public void setAttractive(boolean attractive) { this.attractive = attractive; }

    public String getOrchidURL() { return orchidURL; }
    public void setOrchidURL(String orchidURL) { this.orchidURL = orchidURL; }
}
