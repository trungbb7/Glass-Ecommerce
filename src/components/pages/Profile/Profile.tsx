import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Lock, Package, Heart, History, LogOut, Save, Edit2 } from "lucide-react";
import { Header } from "@/components/Header/index.ts";
import { Footer } from "@/components/Footer";
import { useAppSelector, useAppDispatch } from "@/hooks.ts";
import { loginUser, logoutUser } from "@/components/Auth/authSlice.ts";
import { pushNotification } from "@/components/Notification/notificationSlice.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog.tsx";

interface ProfileFormData {
    fullName: string;
    email: string;
    tel: string;
    address: string;
}

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

function Profile() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, logged } = useAppSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>({
        fullName: "",
        email: "",
        tel: "",
        address: "",
    });
    const [passwordData, setPasswordData] = useState<PasswordFormData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                tel: user.tel || "",
                address: user.address || "",
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/users/${user.id}/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(loginUser(data.user));
                dispatch(pushNotification({
                    type: "success",
                    title: "Thành công",
                    message: "Cập nhật thông tin thành công!"
                }));
                setIsEditing(false);
            } else {
                const error = await response.json();
                dispatch(pushNotification({
                    type: "error",
                    title: "Lỗi",
                    message: error.error || "Cập nhật thất bại"
                }));
            }
        } catch (error) {
            dispatch(pushNotification({
                type: "error",
                title: "Lỗi",
                message: "Đã có lỗi xảy ra"
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (!user?.id) return;

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            dispatch(pushNotification({
                type: "error",
                title: "Lỗi",
                message: "Mật khẩu mới không khớp"
            }));
            return;
        }

        if (passwordData.newPassword.length < 4) {
            dispatch(pushNotification({
                type: "error",
                title: "Lỗi",
                message: "Mật khẩu mới phải có ít nhất 4 ký tự"
            }));
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/users/${user.id}/password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            if (response.ok) {
                dispatch(pushNotification({
                    type: "success",
                    title: "Thành công",
                    message: "Đổi mật khẩu thành công!"
                }));
                setShowPasswordDialog(false);
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                const error = await response.json();
                dispatch(pushNotification({
                    type: "error",
                    title: "Lỗi",
                    message: error.error || "Đổi mật khẩu thất bại"
                }));
            }
        } catch (error) {
            dispatch(pushNotification({
                type: "error",
                title: "Lỗi",
                message: "Đã có lỗi xảy ra"
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(pushNotification({
            type: "info",
            title: "Đăng xuất",
            message: "Bạn đã đăng xuất thành công"
        }));
        navigate("/");
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                tel: user.tel || "",
                address: user.address || "",
            });
        }
    };

    if (!logged) {
        return (
            <>
                <Header />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Vui lòng đăng nhập</CardTitle>
                            <CardDescription>Bạn cần đăng nhập để xem thông tin tài khoản</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button onClick={() => navigate("/login")} className="w-full">
                                Đăng nhập
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8 min-h-[60vh]">
                <h1 className="text-2xl font-bold mb-6">Tài khoản của tôi</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{user?.fullName || "Người dùng"}</CardTitle>
                                        <CardDescription>{user?.email}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <nav className="flex flex-col">
                                    <Link
                                        to="/orders"
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-muted transition-colors"
                                    >
                                        <Package className="h-5 w-5" />
                                        <span>Đơn hàng của tôi</span>
                                    </Link>
                                    <Link
                                        to="/wishlist"
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-muted transition-colors"
                                    >
                                        <Heart className="h-5 w-5" />
                                        <span>Danh sách yêu thích</span>
                                    </Link>
                                    <Link
                                        to="/view-history"
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-muted transition-colors"
                                    >
                                        <History className="h-5 w-5" />
                                        <span>Lịch sử xem</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-destructive/10 text-destructive transition-colors text-left"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Đăng xuất</span>
                                    </button>
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main content */}
                    <div className="lg:col-span-3">
                        <Tabs defaultValue="profile">
                            <TabsList className="mb-6">
                                <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                                <TabsTrigger value="security">Bảo mật</TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Thông tin cá nhân</CardTitle>
                                                <CardDescription>
                                                    Quản lý thông tin cá nhân của bạn
                                                </CardDescription>
                                            </div>
                                            {!isEditing && (
                                                <Button variant="outline" onClick={() => setIsEditing(true)}>
                                                    <Edit2 className="h-4 w-4 mr-2" />
                                                    Chỉnh sửa
                                                </Button>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName" className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    Họ và tên
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="fullName"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        placeholder="Nhập họ và tên"
                                                    />
                                                ) : (
                                                    <p className="text-muted-foreground py-2">
                                                        {user?.fullName || "Chưa cập nhật"}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    Email
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Nhập email"
                                                    />
                                                ) : (
                                                    <p className="text-muted-foreground py-2">
                                                        {user?.email || "Chưa cập nhật"}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="tel" className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4" />
                                                    Số điện thoại
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="tel"
                                                        name="tel"
                                                        value={formData.tel}
                                                        onChange={handleInputChange}
                                                        placeholder="Nhập số điện thoại"
                                                    />
                                                ) : (
                                                    <p className="text-muted-foreground py-2">
                                                        {user?.tel || "Chưa cập nhật"}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="address" className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    Địa chỉ
                                                </Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="address"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        placeholder="Nhập địa chỉ"
                                                    />
                                                ) : (
                                                    <p className="text-muted-foreground py-2">
                                                        {user?.address || "Chưa cập nhật"}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                    {isEditing && (
                                        <CardFooter className="flex gap-3 justify-end">
                                            <Button variant="outline" onClick={handleCancelEdit}>
                                                Hủy
                                            </Button>
                                            <Button onClick={handleUpdateProfile} disabled={loading}>
                                                <Save className="h-4 w-4 mr-2" />
                                                {loading ? "Đang lưu..." : "Lưu thay đổi"}
                                            </Button>
                                        </CardFooter>
                                    )}
                                </Card>
                            </TabsContent>

                            <TabsContent value="security">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Bảo mật</CardTitle>
                                        <CardDescription>
                                            Quản lý mật khẩu và bảo mật tài khoản
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Lock className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Mật khẩu</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Thay đổi mật khẩu đăng nhập của bạn
                                                    </p>
                                                </div>
                                            </div>
                                            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">Đổi mật khẩu</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Đổi mật khẩu</DialogTitle>
                                                        <DialogDescription>
                                                            Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                                                            <Input
                                                                id="currentPassword"
                                                                name="currentPassword"
                                                                type="password"
                                                                value={passwordData.currentPassword}
                                                                onChange={handlePasswordChange}
                                                                placeholder="Nhập mật khẩu hiện tại"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="newPassword">Mật khẩu mới</Label>
                                                            <Input
                                                                id="newPassword"
                                                                name="newPassword"
                                                                type="password"
                                                                value={passwordData.newPassword}
                                                                onChange={handlePasswordChange}
                                                                placeholder="Nhập mật khẩu mới"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                                                            <Input
                                                                id="confirmPassword"
                                                                name="confirmPassword"
                                                                type="password"
                                                                value={passwordData.confirmPassword}
                                                                onChange={handlePasswordChange}
                                                                placeholder="Nhập lại mật khẩu mới"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Hủy</Button>
                                                        </DialogClose>
                                                        <Button onClick={handleChangePassword} disabled={loading}>
                                                            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;