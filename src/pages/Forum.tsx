import { useState } from 'react';
import { Search, MessageCircle, Users, TrendingUp, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface ForumCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  threads: number;
  posts: number;
  lastActivity: string;
  isPrivate?: boolean;
}

interface ForumThread {
  id: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  views: number;
  lastReply: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

export default function Forum() {
  const [activeTab, setActiveTab] = useState<'categories' | 'trending' | 'my-threads'>('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: ForumCategory[] = [
    {
      id: 'introductions',
      title: 'Introductions',
      description: 'Welcome to our community! Introduce yourself and connect with others.',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      threads: 156,
      posts: 428,
      lastActivity: '2 hours ago',
    },
    {
      id: 'reintegration',
      title: 'Reintegration Support',
      description: 'Share experiences and advice about reintegration and rehabilitation.',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      threads: 312,
      posts: 1256,
      lastActivity: '15 minutes ago',
    },
    {
      id: 'job-training',
      title: 'Job & Training',
      description: 'Discuss job opportunities, training programs, and career development.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      threads: 245,
      posts: 987,
      lastActivity: '1 hour ago',
    },
    {
      id: 'counseling',
      title: 'Counseling & Mental Health',
      description: 'Mental health resources and support discussions (Moderated).',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      threads: 198,
      posts: 745,
      lastActivity: '30 minutes ago',
      isPrivate: true,
    },
    {
      id: 'family',
      title: 'Family & Relationships',
      description: 'Discuss family matters, relationships, and social connections.',
      icon: <Users className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      threads: 267,
      posts: 1102,
      lastActivity: '45 minutes ago',
    },
    {
      id: 'announcements',
      title: 'Announcements',
      description: 'Important updates and news from BornAgain (Read-only).',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      threads: 87,
      posts: 234,
      lastActivity: '3 hours ago',
    },
  ];

  const trendingThreads: ForumThread[] = [
    {
      id: '1',
      title: 'Success Story: From Prison to CEO',
      category: 'reintegration',
      author: 'Ali H.',
      replies: 42,
      views: 1203,
      lastReply: '5 minutes ago',
      isPinned: true,
    },
    {
      id: '2',
      title: 'Best Strategies for Job Interviews',
      category: 'job-training',
      author: 'Fatima M.',
      replies: 28,
      views: 856,
      lastReply: '20 minutes ago',
    },
    {
      id: '3',
      title: 'Reconnecting with Family After Release',
      category: 'family',
      author: 'Mohamed K.',
      replies: 35,
      views: 1045,
      lastReply: '10 minutes ago',
    },
    {
      id: '4',
      title: 'Rebuilding Trust: A Guide',
      category: 'reintegration',
      author: 'Aisha L.',
      replies: 18,
      views: 634,
      lastReply: '1 hour ago',
    },
    {
      id: '5',
      title: 'Available Training Programs Q4 2024',
      category: 'announcements',
      author: 'BornAgain Admin',
      replies: 0,
      views: 2341,
      lastReply: '3 hours ago',
      isLocked: true,
    },
  ];

  const filteredThreads = trendingThreads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BornAgain Community Forum</h1>
          <p className="text-lg opacity-90">
            Connect with others, share experiences, and support each other's journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Search discussions, topics, and members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'categories'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'trending'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab('my-threads')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'my-threads'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Threads
          </button>
        </div>

        {/* Categories View */}
        {activeTab === 'categories' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                        {category.icon}
                      </div>
                      {category.isPrivate && (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-white/90 text-sm">{category.description}</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{category.threads}</p>
                        <p className="text-sm text-gray-600">Threads</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{category.posts}</p>
                        <p className="text-sm text-gray-600">Posts</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-orange-600">{category.lastActivity}</p>
                        <p className="text-xs text-gray-600">Last active</p>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      Browse Category
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Trending View */}
        {activeTab === 'trending' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Trending Discussions</h2>
            <div className="space-y-4">
              {filteredThreads.length > 0 ? (
                filteredThreads.map((thread) => (
                  <Card
                    key={thread.id}
                    className="hover:shadow-lg transition-all cursor-pointer p-6 border-l-4 border-orange-500"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {thread.isPinned && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                              PINNED
                            </span>
                          )}
                          {thread.isLocked && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded flex items-center gap-1">
                              <Lock className="w-3 h-3" /> LOCKED
                            </span>
                          )}
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            {thread.category.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {thread.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Started by <span className="font-semibold">{thread.author}</span> • Last reply: {thread.lastReply}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-gray-900">{thread.replies}</div>
                        <p className="text-xs text-gray-600">Replies</p>
                        <div className="text-lg font-semibold text-orange-600 mt-2">{thread.views}</div>
                        <p className="text-xs text-gray-600">Views</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-gray-600 text-lg">No threads found matching your search.</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* My Threads View */}
        {activeTab === 'my-threads' && (
          <div>
            <div className="text-center py-12">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white mb-6">
                Create New Thread
              </Button>
              <Card className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-4">
                  Sign in to create and manage your own discussion threads
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Sign In to Continue
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Community Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">2,847</div>
            <p className="text-gray-600">Active Members</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">18,923</div>
            <p className="text-gray-600">Total Discussions</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">156,432</div>
            <p className="text-gray-600">Posts Created</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">Online</div>
            <p className="text-gray-600">847 Members</p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Join Our Community Today</h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Connect with thousands of members who are on the same journey. Share your story, learn from others, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold">
              Create Account
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-700 text-white font-bold border border-white">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Forum</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Categories</a></li>
                <li><a href="#" className="hover:text-white transition">Trending</a></li>
                <li><a href="#" className="hover:text-white transition">New Posts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Members</a></li>
                <li><a href="#" className="hover:text-white transition">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Report Issue</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Code of Conduct</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm">© 2024 BornAgain NGO. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
